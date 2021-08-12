export interface CityDTO {
  name?: string;
  cityCode?: string;
}

export interface FlightDTO {
  name?: string;
  arrivalTime?: string;
  departureTime?: string;
  fromCity: CityDTO;
  toCity: CityDTO;
}

export interface JourneyDTO {
  price?: number;
  type?: JourneyType;
  flight?: FlightDTO;
  flightDate?: string;
  returnFlight?: FlightDTO;
  returnDate?: string;
}

export type JourneyType = 'TWO_WAY' | 'ONE_WAY';
