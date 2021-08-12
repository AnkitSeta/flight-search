import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  CityDTO,
  JourneyDTO,
  JourneyType,
} from 'src/app/core/models/flight.model';
import { CityService } from 'src/app/core/services/city.service';
import { FlightService } from 'src/app/core/services/flight.service';

@Component({
  selector: 'app-flight-filters',
  templateUrl: './flight-filters.component.html',
  styleUrls: ['./flight-filters.component.scss'],
})
export class FlightFiltersComponent implements OnInit {
  @Output() closeFilter = new EventEmitter<void>();
  flightType: JourneyType = 'TWO_WAY';
  cities: Observable<CityDTO[]> | undefined;
  passangers: number[] = [1, 2, 3, 4, 5, 6];
  today: Date = new Date();
  constructor(
    private fb: FormBuilder,
    private cityService: CityService,
    private datePipe: DatePipe,
    private flightService: FlightService
  ) {}

  filterForm: FormGroup = this.fb.group({
    fromCity: ['', [Validators.required]],
    toCity: ['', [Validators.required]],
    flightDate: ['', [Validators.required]],
    returnDate: ['', [Validators.required]],
    passange: [''],
    type: [this.flightType],
  });

  ngOnInit(): void {
    this.getAllCities();
    this.observeCities();
  }

  formRef() {
    return this.filterForm.controls;
  }

  getAllCities() {
    this.cityService.getAll().subscribe((res) => {});
  }

  observeCities() {
    this.cities = this.cityService.cities;
  }

  compareCities(cityCode: any) {
    return this.formRef()['fromCity'].value === cityCode;
  }

  onFromCitySelect(value: string) {
    if (this.formRef()['toCity'].value === value) {
      this.formRef()['toCity'].reset();
    }
  }

  onFlightTypeChange(value: JourneyType) {
    this.flightType = value;
    if (value !== 'TWO_WAY') {
      this.formRef()['returnDate'].setValidators([]);
    } else {
      this.formRef()['returnDate'].setValidators([Validators.required]);
    }

    this.formRef()['returnDate'].updateValueAndValidity();
  }

  onSubmit() {
    if (this.filterForm.invalid) return;

    let filters: any = this.filterForm.value;

    filters.flightDate = this.datePipe.transform(
      filters.flightDate,
      'yyyy-MM-dd'
    );

    filters.returnDate = this.datePipe.transform(
      filters.returnDate,
      'yyyy-MM-dd'
    );

    console.log(filters);
    this.getAllFlights(filters);
  }

  getAllFlights(filters: any) {
    this.flightService.getAll().subscribe((res) => {
      this.filterFlights(filters);
      this.closeFilter.next();
    });
  }

  filterFlights(filters: any) {
    const journeys: JourneyDTO[] = this.flightService.flights.getValue();

    const filterdJourneys: JourneyDTO[] = journeys.filter((journey) =>
      this.validFlight(journey, filters)
    );

    console.log(filterdJourneys);
    this.flightService.flights.next(filterdJourneys);
    this.flightService.filters.next(filters);
  }

  validFlight(journey: JourneyDTO, fliters: any) {
    if (journey.type !== fliters.type) return false;

    if (journey.flightDate !== fliters.flightDate) return false;

    if (this.flightType === 'TWO_WAY') {
      if (journey.returnDate !== fliters.returnDate) return false;
    }

    if (journey.flight?.toCity.cityCode !== fliters.toCity) return false;

    if (journey.flight?.fromCity.cityCode !== fliters.fromCity) return false;

    return true;
  }
}
