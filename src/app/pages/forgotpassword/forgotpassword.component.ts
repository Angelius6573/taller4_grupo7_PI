import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotPasswordComponent {
  registro: string = '';
  email: string = '';
  nuevaPassword: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit(event: Event) {
    event.preventDefault();

    if (!this.registro || !this.email || !this.nuevaPassword) {
      alert('⚠️ Completa todos los campos');
      return;
    }

    this.authService.resetPassword({
      registro: this.registro.trim().toLowerCase(),
      email: this.email.trim().toLowerCase(),
      nuevaPassword: this.nuevaPassword.trim()
    }).subscribe({
      next: () => {
        alert('✅ Contraseña restablecida con éxito. Ahora puedes iniciar sesión.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert(`❌ ${err.message}`);
      }
    });
  }
}
