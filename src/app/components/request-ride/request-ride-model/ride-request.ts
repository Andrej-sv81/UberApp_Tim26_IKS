import {PassengerDTO} from "./passengerDTO";
import {LocationDTO} from "./locationDTO";

export interface RideRequest{
    locations:{departure: LocationDTO,
               destination: LocationDTO}[];
    passengers: PassengerDTO[];
    vehicleType: any;
    babyTransport: any;
    petTransport: any;
    scheduledTime: any;
}
