import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, Usuario } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  usuario: Usuario | null = null;
  esMiPerfil: boolean = false;

  nuevoCurso: string = '';
  creditosCurso: number = 0;

  currentUser: Usuario | null = null;

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const registro = params['registro'];
      const user = this.authService.getUserByRegistro(registro);
      if (!user) {
        alert('❌ Usuario no encontrado');
        return;
      }

      this.usuario = user;
      this.esMiPerfil = this.currentUser?.registro === this.usuario?.registro;

      if (!this.usuario.cursos) this.usuario.cursos = [];
    });
  }

  private actualizarUsuario() {
    if (!this.usuario) return;
    this.authService.updateUser(this.usuario);
    if (this.esMiPerfil) this.currentUser = this.usuario;
  }

  agregarCurso() {
    if (!this.nuevoCurso.trim() || this.creditosCurso <= 0) return;
    this.usuario?.cursos?.push({ nombre: this.nuevoCurso.trim(), creditos: this.creditosCurso });
    this.actualizarUsuario();
    this.nuevoCurso = '';
    this.creditosCurso = 0;
  }

  guardarCambios() {
    this.actualizarUsuario();
    alert('✅ Datos actualizados');
  }

  get totalCreditos(): number {
    return this.usuario?.cursos?.reduce((acc, c) => acc + c.creditos, 0) || 0;
  }
}
