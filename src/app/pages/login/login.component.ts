import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, Usuario } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  registro: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();

    if (!this.registro || !this.password) {
      alert('⚠️ Ingresa tus credenciales');
      return;
    }

    this.authService.login(this.registro, this.password).subscribe({
      next: (usuario: Usuario) => {
        alert(`✅ Bienvenido ${usuario.nombres}`);
        this.router.navigate(['/home']);
      },
      error: (err) => alert(`❌ ${err.message}`)
    });
  }
}
