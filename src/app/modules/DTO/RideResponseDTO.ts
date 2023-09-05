import {RejectionDTO} from "../passenger/request-ride/request-ride-model/rejectionDTO";
import {DriverDTO} from "../passenger/request-ride/request-ride-model/driverDTO";
import {PassengerDTO} from "../passenger/request-ride/request-ride-model/passengerDTO";
import {LocationDTO} from "../passenger/request-ride/request-ride-model/locationDTO";
import {RouteDTO} from "../passenger/request-ride/request-ride-model/routeDTO";

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
  locations: RouteDTO[];
  status: string;
  scheduledTime: string;

}
