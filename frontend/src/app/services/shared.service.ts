
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Photo } from '../interfaces/Photo';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private _searchResults = new BehaviorSubject<Photo[]>([]);
  searchResults$ = this._searchResults.asObservable();

  updateSearchResults(results: Photo[]): void {
    this._searchResults.next(results);
  }
}
