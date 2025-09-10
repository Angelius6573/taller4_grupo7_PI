import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

export interface Curso {
  nombre: string;
  creditos: number;
}

export interface Usuario {
  registro: string;
  nombres: string;
  apellidos: string;
  email: string;
  password: string;
  cursos?: Curso[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersKey = 'users';
  private currentUserKey = 'currentUser';

  constructor(private router: Router) {}

  // 🔹 Registrar usuario
  register(user: Usuario): Observable<Usuario> {
    const users: Usuario[] = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    const exists = users.find(u => u.registro === user.registro || u.email === user.email);
    if (exists) return throwError(() => new Error('Usuario ya existe'));

    users.push(user);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    return of(user);
  }

  // 🔹 Iniciar sesión
  login(registro: string, password: string): Observable<Usuario> {
    const users: Usuario[] = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    const user = users.find(u => u.registro.toLowerCase() === registro.toLowerCase() && u.password === password);

    if (user) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
      return of(user);
    }
    return throwError(() => new Error('Credenciales incorrectas'));
  }

  getUserByRegistro(registro: string): Usuario | null {
    const users: Usuario[] = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    return users.find(u => u.registro === registro) || null;
  }

  setSession(usuario: Usuario): void {
    localStorage.setItem(this.currentUserKey, JSON.stringify(usuario));
  }

  // 🔹 Obtener usuario actual
  getCurrentUser(): Usuario | null {
    const user = localStorage.getItem(this.currentUserKey);
    return user ? JSON.parse(user) : null;
  }

  // 🔹 Cerrar sesión
  logout(): void {
    localStorage.removeItem(this.currentUserKey);
    this.router.navigate(['/login']);
  }

  // 🔹 Restablecer contraseña
 resetPassword(payload: { registro: string; email: string; nuevaPassword: string }): Observable<boolean> {
    let users = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    const idx = users.findIndex(
      (u: any) => u.registro === payload.registro && u.email === payload.email
    );

    if (idx !== -1) {
      users[idx].password = payload.nuevaPassword;
      localStorage.setItem(this.usersKey, JSON.stringify(users));
      return of(true); // ✅ Devuelve Observable
    }

    return throwError(() => new Error('Registro Académico o Correo incorrectos'));
  }

  
  updateUser(usuario: Usuario): void {
    const users: Usuario[] = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    const idx = users.findIndex(u => u.registro === usuario.registro);
    if (idx !== -1) {
      users[idx] = usuario;
      localStorage.setItem(this.usersKey, JSON.stringify(users));
    }
    if (this.getCurrentUser()?.registro === usuario.registro) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(usuario));
    }
  }
}
