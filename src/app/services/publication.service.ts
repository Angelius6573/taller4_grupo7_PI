import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService, Usuario } from './auth.service';

export interface Publicacion {
  id: number;
  usuario: string;
  tipo: 'Curso' | 'Catedrático';
  nombre: string;
  mensaje: string;
  fecha: string;
  comentarios: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private publicacionesKey = 'publicaciones';

  constructor(private authService: AuthService) {}

  // 🔹 Obtener todas las publicaciones
  getAll(): Observable<Publicacion[]> {
    const data = localStorage.getItem(this.publicacionesKey);
    const pubs: Publicacion[] = data ? JSON.parse(data) : [];
    pubs.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
    return of(pubs);
  }

  // 🔹 Crear nueva publicación
  create(tipo: 'Curso' | 'Catedrático', nombre: string, mensaje: string): Observable<Publicacion> {
    const usuario: Usuario | null = this.authService.getCurrentUser();
    if (!usuario) throw new Error('Debes iniciar sesión');

    const data = localStorage.getItem(this.publicacionesKey);
    const publicaciones: Publicacion[] = data ? JSON.parse(data) : [];

    const nueva: Publicacion = {
      id: publicaciones.length + 1,
      usuario: `${usuario.nombres} ${usuario.apellidos}`,
      tipo,
      nombre,
      mensaje,
      fecha: new Date().toISOString(),
      comentarios: []
    };

    publicaciones.push(nueva);
    localStorage.setItem(this.publicacionesKey, JSON.stringify(publicaciones));

    return of(nueva);
  }

  // 🔹 Agregar comentario
  addComment(pubId: number, comentario: string): Observable<void> {
    const data = localStorage.getItem(this.publicacionesKey);
    const publicaciones: Publicacion[] = data ? JSON.parse(data) : [];
    const pub = publicaciones.find(p => p.id === pubId);
    if (pub && comentario.trim()) {
      pub.comentarios.push(comentario);
      localStorage.setItem(this.publicacionesKey, JSON.stringify(publicaciones));
    }
    return of();
  }
}
