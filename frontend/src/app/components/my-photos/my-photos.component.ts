import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { Photo } from '../../interfaces/Photo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-photos',
  templateUrl: './my-photos.component.html',
  styleUrls: ['./my-photos.component.css']
})
export class MyPhotosComponent implements OnInit {
  photos: Photo[] = [];
  showDescription: boolean = false;
  constructor(
    private photoService: PhotoService,
    private router: Router 
  ) { }


  ngOnInit() {
    this.photoService.getPhotos()
      .subscribe(
        res => {
          this.photos = res;
        },
        err => console.log(err)
      );
  }

  selectedCard(id: string | undefined): void {
    if (id) {
      this.router.navigate(['/photos', id]);
    }
  }

}