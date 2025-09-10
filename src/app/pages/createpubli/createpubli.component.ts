import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PublicationService } from '../../services/publication.service';
import { AuthService, Usuario } from '../../services/auth.service';

@Component({
  selector: 'app-createpubli',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './createpubli.component.html',
  styleUrls: ['./createpubli.component.css']
})
export class CreatepubliComponent {
  tipo: 'Curso' | 'Catedrático' = 'Curso';
  nombre: string = '';
  mensaje: string = '';

  currentUser: Usuario | null = null;

  constructor(
    private pubService: PublicationService,
    private authService: AuthService,
    private router: Router
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  guardarPublicacion() {
    if (!this.nombre.trim() || !this.mensaje.trim()) {
      alert('Debes llenar todos los campos.');
      return;
    }

    if (!this.currentUser) {
      alert('Debes iniciar sesión para publicar.');
      this.router.navigate(['/login']);
      return;
    }

    this.pubService.create(this.tipo, this.nombre.trim(), this.mensaje.trim()).subscribe({
      next: () => {
        alert('Publicación creada con éxito 🎉');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        alert(`❌ ${err.message}`);
      }
    });
  }
}
