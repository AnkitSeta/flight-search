import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { JourneyDTO } from '../models/flight.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  flights = new BehaviorSubject<JourneyDTO[]>([]);
  filters = new Subject<any>();

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<JourneyDTO[]>(`./assets/misc/flightData.json`).pipe(
      tap((res: any[]) => {
        this.flights.next(res);
      })
    );
  }
}
