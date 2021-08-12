import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightCardsComponent } from './flight-cards.component';

describe('FlightCardsComponent', () => {
  let component: FlightCardsComponent;
  let fixture: ComponentFixture<FlightCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
