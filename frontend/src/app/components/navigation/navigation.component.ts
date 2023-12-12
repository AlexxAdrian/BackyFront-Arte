import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit, AfterViewInit {
  isAuthenticated: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center'; 
  verticalPosition: MatSnackBarVerticalPosition = 'top'; 
  query: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private photoService: PhotoService
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((authenticated) => {
      this.isAuthenticated = authenticated;
    });
  }

  ngAfterViewInit(): void {
    const toggleButton = document.getElementById('navbar-toggle');
    const navbarLinks = document.getElementById('navbar-links');

    if (toggleButton && navbarLinks) {
      toggleButton.addEventListener('click', () => {
        navbarLinks.classList.toggle('active');
      });

      const navLinks = navbarLinks.getElementsByTagName('a');
      for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', () => {
          navbarLinks.classList.remove('active');
        });
      }
    }
  }
  searchPhotos(): void {
    if (this.query.trim() !== '') {
        this.photoService.searchPhotos(this.query).subscribe(
            (result) => {
                // Maneja los resultados de la búsqueda, por ejemplo, actualiza una lista de fotos en el componente
                console.log('Resultados de la búsqueda:', result);
            },
            (error) => console.error('Error al buscar fotos:', error)
        );
    }
}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
    this.openSnackBar('¡Nos vemos pronto!', 'success-snackbar');
  }

  private openSnackBar(message: string, panelClass: string): void {
    const snackBarRef = this.snackBar.open(message, 'Cerrar', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: panelClass,
    });
  }
}
