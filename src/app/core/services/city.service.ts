import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CityDTO } from '../models/flight.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  cities = new BehaviorSubject<CityDTO[]>([]);
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<CityDTO[]>(`./assets/misc/cityData.json`).pipe(
      tap((res: any[]) => {
        this.cities.next(res);
      })
    );
  }
}
