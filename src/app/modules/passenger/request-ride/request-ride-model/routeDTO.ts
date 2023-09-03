import {PassengerDTO} from "./passengerDTO";
import {LocationDTO} from "./locationDTO";

export interface RouteDTO{
  departure:LocationDTO; // treba da ima route dto
  destination: LocationDTO;
}
