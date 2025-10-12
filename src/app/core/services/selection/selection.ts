import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SelectionService {
  private _coord = new BehaviorSubject<{ lat: number; lng: number } | null>(null);
  coord$ = this._coord.asObservable();
  setCoord(lat: number, lng: number) { this._coord.next({ lat, lng }); }
}
