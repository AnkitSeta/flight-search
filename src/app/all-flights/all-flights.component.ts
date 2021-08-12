import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FlightDTO, JourneyDTO } from '../core/models/flight.model';
import { FlightService } from '../core/services/flight.service';

@Component({
  selector: 'app-all-flights',
  templateUrl: './all-flights.component.html',
  styleUrls: ['./all-flights.component.scss'],
})
export class AllFlightsComponent implements OnInit {
  flights$: Observable<JourneyDTO[]> | undefined;
  filters$: Observable<any> | undefined;

  constructor(private flightService: FlightService) {}

  ngOnInit(): void {
    this.getAllFlights();
    this.observeFlights();
    this.observeFilters()
  }

  getAllFlights() {
    this.flightService.getAll().subscribe((res) => {});
  }

  observeFlights() {
    this.flights$ = this.flightService.flights;
  }

  observeFilters(){
    this.filters$ = this.flightService.filters;
  }
}
