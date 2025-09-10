import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Publicacion {
  id: number;
  usuario: string;
  tipo: 'Curso' | 'Catedrático';
  nombre: string;
  mensaje: string;
  fecha: string;
  comentarios: string[];
}

@Component({
  selector: 'app-publi',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './createpubli.component.html',
  styleUrl: './createpubli.component.css'
})
export class CreatepubliComponent {
  tipo: 'Curso' | 'Catedrático' = 'Curso';
  nombre: string = '';
  mensaje: string = '';

  constructor(private router: Router) {}

  guardarPublicacion() {
    if (!this.nombre.trim() || !this.mensaje.trim()) {
      alert('Debes llenar todos los campos.');
      return;
    }

    const usuarioActivo = localStorage.getItem('usuarioActivo');
    if (!usuarioActivo) {
      alert('Debes iniciar sesión para publicar.');
      this.router.navigate(['/login']);
      return;
    }

    const publicaciones = JSON.parse(localStorage.getItem('publicaciones') || '[]');

    const nueva: Publicacion = {
      id: publicaciones.length + 1,
      usuario: usuarioActivo,
      tipo: this.tipo,
      nombre: this.nombre,
      mensaje: this.mensaje,
      fecha: new Date().toISOString(),
      comentarios: []
    };

    publicaciones.push(nueva);
    localStorage.setItem('publicaciones', JSON.stringify(publicaciones));

    alert('Publicación creada con éxito 🎉');
    this.router.navigate(['/home']);
  }
}
