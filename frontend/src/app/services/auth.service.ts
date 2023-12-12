import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:4000/api';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkToken());

  constructor(private http: HttpClient) {}

  private checkToken(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(
        (response: any) => {
          console.log('Login successful', response);
          localStorage.setItem('token', response.token);
          this.isAuthenticatedSubject.next(true);
        },
        (error) => {
          console.error('Login error:', error);
        }
      )
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, email, password }).pipe(
      tap((response: any) => { 
        console.log('Registration successful', response); 
        this.sendConfirmationEmail(email).subscribe(
          () => console.log('Confirmation email sent successfully'),
          (error) => console.error('Error sending confirmation email', error)
        );
      })
    );
  }

  private sendConfirmationEmail(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-confirmation-email`, { email });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId(): string | null {
    const token = localStorage.getItem('token');

    if (!token) {
      console.log('Token not found in localStorage.');
      return null;
    }

    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const userId = tokenPayload?.id;

      if (userId) {
        console.log('User ID:', userId);
        return userId;
      } else {
        console.log('User ID not found in the token.');
        return null;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
