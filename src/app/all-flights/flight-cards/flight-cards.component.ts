import { Component, Input, OnInit } from '@angular/core';
import { JourneyDTO } from 'src/app/core/models/flight.model';

@Component({
  selector: 'app-flight-cards',
  templateUrl: './flight-cards.component.html',
  styleUrls: ['./flight-cards.component.scss']
})
export class FlightCardsComponent implements OnInit {
  @Input() journey: JourneyDTO | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
