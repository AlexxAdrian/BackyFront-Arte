import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PhotoService } from '../../services/photo.service';
import { Photo } from '../../interfaces/Photo';

@Component({
  selector: 'app-photos-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.css'],
})
export class PhotosListComponent implements OnInit {
  photos: Photo[] = [];
  showDescription: boolean = false;

  
  currentPage: number = 1;
  itemsPerPage: number = 13;

  constructor(private photoService: PhotoService, private router: Router) {}

  ngOnInit() {
    this.loadPhotos();
  }

  loadPhotos(): void {
    this.photoService.getPhotos().subscribe(
      (res) => {
        this.photos = res;
      },
      (err) => console.log(err)
    );
  }

  selectedCard(id: string | undefined): void {
    if (id) {
      this.router.navigate(['/photos', id]);
    }
  }

  getCurrentPagePhotos(): Photo[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.photos.slice(startIndex, endIndex);
  }

  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.photos.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
}
