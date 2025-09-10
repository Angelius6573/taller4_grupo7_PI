import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, Usuario } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registro: string = '';
  nombres: string = '';
  apellidos: string = '';
  password: string = '';
  email: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit(event: Event) {
    event.preventDefault();

    if (!this.registro || !this.nombres || !this.apellidos || !this.password || !this.email) {
      alert('⚠️ Todos los campos son obligatorios');
      return;
    }

    const newUser: Usuario = {
      registro: this.registro.trim().toLowerCase(),
      nombres: this.nombres.trim(),
      apellidos: this.apellidos.trim(),
      password: this.password.trim(),
      email: this.email.trim().toLowerCase(),
      cursos: []
    };

    this.authService.register(newUser).subscribe({
      next: () => {
        alert('✅ Usuario registrado correctamente. Ahora puedes iniciar sesión.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert(`❌ ${err.message}`);
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
