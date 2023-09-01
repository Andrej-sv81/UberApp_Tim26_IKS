import {RejectionDTO} from "../../components/request-ride/request-ride-model/rejectionDTO";
import {DriverDTO} from "../../components/request-ride/request-ride-model/driverDTO";
import {PassengerDTO} from "../../components/request-ride/request-ride-model/passengerDTO";
import {LocationDTO} from "../../components/request-ride/request-ride-model/locationDTO";

export interface RideResponseDTO {

  id: number;
  startTime: string;
  endTime: string;
  totalCost: number;
  driver: DriverDTO;
  passengers: PassengerDTO[];
  estimatedTimeInMinutes: number;
  vehicleType: string;
  babyTransport: any;
  petTransport: any;
  rejection: RejectionDTO;
  locations: LocationDTO[];
  status: string;
  scheduledTime: string;

}
