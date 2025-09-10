import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { PublicationService, Publicacion } from '../../services/publication.service';
import { AuthService, Usuario } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  providers: [DatePipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  publicaciones: Publicacion[] = [];
  filtro: string = '';
  tipoFiltro: string = 'todos';
  registroBusqueda: string = '';

  currentUser: Usuario | null = null;

  constructor(
    private router: Router,
    private pubService: PublicationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      alert('⚠️ Debes iniciar sesión primero');
      this.router.navigate(['/login']);
      return;
    }

    this.cargarPublicaciones();
  }

  cargarPublicaciones(): void {
    this.pubService.getAll().subscribe(pubs => {
      this.publicaciones = pubs;
      this.aplicarFiltro(); // aplicamos filtro si hay algo
    });
  }

  aplicarFiltro(): void {
    this.pubService.getAll().subscribe(all => {
      if (this.tipoFiltro === 'curso') {
        this.publicaciones = all.filter(p => p.tipo === 'Curso' &&
          p.nombre.toLowerCase().includes(this.filtro.toLowerCase())
        );
      } else if (this.tipoFiltro === 'catedratico') {
        this.publicaciones = all.filter(p => p.tipo === 'Catedrático' &&
          p.nombre.toLowerCase().includes(this.filtro.toLowerCase())
        );
      } else {
        this.publicaciones = all;
      }
    });
  }

  comentar(pub: Publicacion, comentario: string): void {
    if (!comentario.trim()) return;
    this.pubService.addComment(pub.id, comentario).subscribe(() => {
      pub.comentarios.push(comentario); // actualizamos la UI inmediatamente
    });
  }

  crearPublicacion(): void {
    this.router.navigate(['/createpubli']);
  }

  miPerfil(): void {
    if (this.currentUser) {
      this.router.navigate(['/profile'], { queryParams: { registro: this.currentUser.registro } });
      return;
    }
    alert('No se encontró el usuario. Debes iniciar sesión.');
    this.router.navigate(['/login']);
  }

  salir(): void {
    this.authService.logout();
  }

  buscarPerfil(): void {
    if (!this.registroBusqueda.trim()) {
      alert('⚠️ Ingresa un número de Registro Personal');
      return;
    }

    const user = this.authService.getUserByRegistro(this.registroBusqueda);
    if (user) {
      this.router.navigate(['/profile'], { queryParams: { registro: this.registroBusqueda } });
    } else {
      alert('❌ No se encontró un usuario con ese Registro Personal');
    }
  }
}
