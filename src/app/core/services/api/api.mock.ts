import { Injectable } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import { Coordinate } from '../../models/coordinate.model';
import { NewsItem } from '../../models/news-item.model';
import { DEMO_COORDS, DEMO_NEWS } from '../../mocks/mock-data';

// Haversine distance in km
function distKm(aLat:number, aLng:number, bLat:number, bLng:number): number {
  const R = 6371, dLat=(bLat-aLat)*Math.PI/180, dLng=(bLng-aLng)*Math.PI/180;
  const s1 = Math.sin(dLat/2)**2 + Math.cos(aLat*Math.PI/180)*Math.cos(bLat*Math.PI/180)*Math.sin(dLng/2)**2;
  return 2*R*Math.atan2(Math.sqrt(s1), Math.sqrt(1-s1));
}

@Injectable({ providedIn: 'root' })
export class ApiMockService {
  getCoordinates(): Observable<Coordinate[]> {
    return of(DEMO_COORDS).pipe(delay(250));
  }

  getNewsByCoord(lat: number, lng: number): Observable<NewsItem[]> {
    const radius = 600; // km
    return of(DEMO_NEWS).pipe(
      delay(250),
      map(items => items
        .map(n => ({ ...n, _d: distKm(lat,lng,n.latitude,n.longitude) }))
        .filter(n => n._d <= radius)
        .sort((a,b) => a._d - b._d)
        .map(({_d, ...n}) => n)
      )
    );
  }
}
