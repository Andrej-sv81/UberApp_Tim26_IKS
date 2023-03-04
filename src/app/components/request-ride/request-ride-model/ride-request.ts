import {PassengerDTO} from "./passengerDTO";
import {LocationDTO} from "./locationDTO";

export interface RideRequest{
    locations:LocationDTO[];
    passengers: PassengerDTO[];
    vehicleType: any;
    babyTransport: any;
    petTransport: any;
    scheduledTime: any;
}
