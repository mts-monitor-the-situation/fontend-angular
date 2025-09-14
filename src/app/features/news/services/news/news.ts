import { Injectable } from '@angular/core';
import { ApiService } from '../../../../core/services/api/api';
import { SelectionService } from '../../../../core/services/selection/selection';
import { NewsItem } from '../../../../core/models/news-item.model';
import {
  Observable, of, switchMap, delay, map, filter, distinctUntilChanged, catchError
} from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { DEMO_NEWS } from '../../../../core/mocks/mock-data';

function haversineKm(aLat:number, aLng:number, bLat:number, bLng:number){
  const R=6371, dLat=(bLat-aLat)*Math.PI/180, dLng=(bLng-aLng)*Math.PI/180;
  const s = Math.sin(dLat/2)**2 + Math.cos(aLat*Math.PI/180)*Math.cos(bLat*Math.PI/180)*Math.sin(dLng/2)**2;
  return 2*R*Math.atan2(Math.sqrt(s),Math.sqrt(1-s));
}
const isZero = (lat:number,lng:number) => Math.abs(lat) < 1e-9 && Math.abs(lng) < 1e-9;

@Injectable({ providedIn: 'root' })
export class NewsService {
  constructor(private api: ApiService, private sel: SelectionService) {}

  streamSelectedNews(): Observable<NewsItem[]> {
    return this.sel.coord$.pipe(
      // ✅ ensure #3: no calls until the user actually selects a point
      filter((c): c is {lat:number; lng:number} => !!c && !isZero(c.lat, c.lng)),
      distinctUntilChanged((a, b) => a.lat === b.lat && a.lng === b.lng),

      switchMap(c => {
        if (environment.mock) {
          const radiusKm = 600;
          return of(DEMO_NEWS).pipe(
            delay(200),
            map(items => items
              .map(n => ({ ...n, _d: haversineKm(c.lat, c.lng, n.latitude, n.longitude) }))
              .filter(n => n._d <= radiusKm)
              .sort((a,b) => a._d - b._d)
              .map(({ _d, ...n }) => n)
            )
          );
        }
        return this.api.getNewsByCoord(c.lat, c.lng);
      }),

      // never blow up the UI
      catchError(() => of<NewsItem[]>([]))
    );
  }
}
