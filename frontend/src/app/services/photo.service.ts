import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; 
import { Photo } from '../interfaces/Photo';
import { SharedService } from './shared.service';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private apiUrl = 'http://localhost:4000/api/photos';

  constructor(private http: HttpClient, private authService: AuthService, private sharedService: SharedService) { }

  
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    
    
    if (token) {
      return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    } else {
      
      console.error('Token no disponible');
      return new HttpHeaders();
    }
  }

  createPhoto(title: string, description: string, photo: File): Observable<any> {
    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);
    fd.append('image', photo);

    return this.http.post(this.apiUrl, fd, { headers: this.getHeaders() });
  }

  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.apiUrl, { headers: this.getHeaders() });
  }

 getPhoto(id: string): Observable<Photo> {
    return this.http.get<Photo>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
  

  

  deletePhoto(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
  

  updatePhoto(id: string, title: string, description: string, photo: File | null): Observable<any> {
    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);

    if (photo) {
      fd.append('image', photo);
    }

    return this.http.put(`${this.apiUrl}/${id}`, fd, { headers: this.getHeaders() });
  }


searchPhotos(query: string): Observable<Photo[]> {
  return this.http.get<Photo[]>(`${this.apiUrl}/search/${query}`, { headers: this.getHeaders() })
    .pipe(
      tap((results) => this.sharedService.updateSearchResults(results)) 
    );
}
}
  
  
