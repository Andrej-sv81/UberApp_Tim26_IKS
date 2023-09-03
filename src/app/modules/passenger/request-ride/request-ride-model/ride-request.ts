import {PassengerDTO} from "./passengerDTO";
import {LocationDTO} from "./locationDTO";
import {RouteDTO} from "./routeDTO";

export interface RideRequest{
    locations:RouteDTO[]; // treba da ima route dto
    passengers: PassengerDTO[];
    vehicleType: any;
    babyTransport: any;
    petTransport: any;
    scheduledTime: any;
}
