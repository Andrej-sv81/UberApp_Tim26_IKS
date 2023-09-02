import {LocationDTO} from "../../../components/request-ride/request-ride-model/locationDTO";

export interface Estimated{
  locations: any[];
  vehicleType: string;
  babyTransport: boolean;
  petTransport: boolean;

}
