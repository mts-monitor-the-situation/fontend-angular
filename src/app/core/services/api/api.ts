import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coordinate } from '../../models/coordinate.model';
import { Observable } from 'rxjs';
import { NewsItem } from '../../models/news-item.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}
  getCoordinates(): Observable<Coordinate[]> {
    return this.http.get<Coordinate[]>('/coordinates');
  }
  getNewsByCoord(lat: number, lng: number): Observable<NewsItem[]> {
    return this.http.get<NewsItem[]>(`/news?lat=${lat}&lng=${lng}`);
  }
}
