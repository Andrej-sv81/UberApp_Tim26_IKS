import {LocationDTO} from "./locationDTO";

export interface RideDTO{
  departure: LocationDTO;
  destination: LocationDTO;
  vehicleType : string;
  babyTransport: boolean;
  petTransport: boolean;
  scheduledTime: string;
}
