import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../../services/photo.service';
import { Photo } from '../../interfaces/Photo';

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.css']
})
export class PhotoPreviewComponent implements OnInit {
  id: string | undefined;
  photo: Photo | undefined;
  newPhotoSelected: string | ArrayBuffer | null = null;
  newFile: File | null = null;

  @ViewChild('newPhotoInput') newPhotoInput!: ElementRef<HTMLInputElement>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.photoService.getPhoto(this.id)
          .subscribe(
            res => {
              this.photo = res;
              this.cdr.detectChanges();
            },
            err => console.error(err)
          );
      }
    });
  }

  deletePhoto(id: string | undefined): void {
    if (id) {
      this.photoService.deletePhoto(id)
        .subscribe(
          res => {
            console.log('Photo deleted:', res);
            this.router.navigate(['/photos']);
          },
          err => console.error(err)
        );
    }
  }

  updatePhoto(title: string, description: string): void {
    console.log('Actualizando foto...');
    console.log('Título:', title);
    console.log('Descripción:', description);
  
    if (this.photo && this.photo._id) {
      this.photoService.updatePhoto(this.photo._id, title, description, this.newFile)
        .subscribe(
          res => {
            console.log('Photo updated:', res);
            this.router.navigate(['/photos']);
            this.newPhotoSelected = null;

            // Resetear la entrada de archivo
            if (this.newPhotoInput) {
              this.newPhotoInput.nativeElement.value = '';
            }
          },
          err => console.error(err)
        );
    }
  }

  onPhotoSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {
      this.newFile = inputElement.files[0];

      // Vista previa de la imagen
      const reader = new FileReader();
      reader.onload = e => this.newPhotoSelected = reader.result as string;
      reader.readAsDataURL(this.newFile);
    }
  }
}

