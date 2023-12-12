import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  email = ''; 
  password = '';
  confirmPassword = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center'; 
  verticalPosition: MatSnackBarVerticalPosition = 'top'; 
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  register(): void {
    if (!this.username || !this.email || !this.password || !this.confirmPassword) {
      this.openSnackBar('El usuario, correo electrónico y la contraseña son obligatorios. Intenta otra vez.', 'error-snackbar');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.openSnackBar('Las contraseñas no coinciden. Verifícalo de nuevo.', 'error-snackbar');
      return;
    }

    this.authService.register(this.username, this.email, this.password).subscribe(
      (response) => {
        console.log('Registro exitoso', response);

        this.openSnackBar(`¡Bienvenido, ${this.username}! Tu cuenta ha sido registrada correctamente.`, 'success-snackbar');

        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error al registrar usuario', error);
        
        if (error.status === 409) {
          this.openSnackBar('El nombre de usuario o correo electrónico ya está en uso. Elige otro.', 'error-snackbar');
        } else {
          this.openSnackBar('Error al registrar usuario. Por favor, inténtalo de nuevo más tarde.', 'error-snackbar');
        }
      }
    );
  }

  private openSnackBar(message: string, panelClass: string): void {
    const snackBarRef = this.snackBar.open(message, 'Cerrar', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: 'top',
      panelClass: panelClass,
    });
  }}
  