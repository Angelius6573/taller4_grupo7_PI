import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService, Usuario } from './auth.service';

export interface Curso {
  nombre: string;
  creditos: number;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersKey = 'users';

  constructor(private authService: AuthService) {}

  listar(): Observable<Usuario[]> {
    const data = localStorage.getItem(this.usersKey);
    return of(data ? JSON.parse(data) : []);
  }

  obtenerPorRegistro(registro: string): Observable<Usuario | null> {
    return new Observable<Usuario | null>(observer => {
      this.listar().subscribe(users => {
        observer.next(users.find(u => u.registro === registro) || null);
        observer.complete();
      });
    });
  }

  actualizar(usuario: Usuario): Observable<Usuario> {
    return new Observable<Usuario>(observer => {
      this.listar().subscribe(users => {
        const idx = users.findIndex(u => u.registro === usuario.registro);
        if (idx === -1) return observer.error('Usuario no encontrado');

        users[idx] = usuario;
        localStorage.setItem(this.usersKey, JSON.stringify(users));

        if (this.authService.getCurrentUser()?.registro === usuario.registro) {
          this.authService.setSession(usuario);
        }

        observer.next(usuario);
        observer.complete();
      });
    });
  }

  agregarCurso(usuario: Usuario, curso: Curso): Observable<Usuario> {
    if (!usuario.cursos) usuario.cursos = [];
    usuario.cursos.push(curso);
    return this.actualizar(usuario);
  }
}
