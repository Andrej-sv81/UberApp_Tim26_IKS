import {User, UserRestrict} from "./User";
import { Route } from "./Route";

export interface Ride {
    status: string;
    id:number;
    startTime:string;
    endTime: string;
    totalCost : number;
    driver : UserRestrict;
    passengers : UserRestrict[];
    estimatedTimeInMinutes: number;
    vehicleType : string;
    babyTransport : boolean;
    petTransport :boolean;
    //rejection?: Rejection;
    locations: Route[];
    //reviews?: Review[];
    scheduledTime?:Date;
  }
  

  
  export interface FavoriteRide {
    id: number;
    favoriteName: string;
    passengers : UserRestrict[];
    vehicleType : string;
    babyTransport : boolean;
    petTransport :boolean;
    locations: Route[];
  }



export interface RideSimulationDTO {
  id: number;
  routeJSON: string;
  rideStatus: number;
  vehicle: VehicleSimulationDTO;
}
export interface VehicleSimulationDTO{
  id: number;
  licensePlateNumber: string;
  latitude: number;
  longitude: number;
}

export interface RideInfoBody{
    locations: Route[],
    vehicleType: string,
    babyTransport: boolean,
    petTransport: boolean,
}

export interface CreateRideDTO{
  passengers: UserRestrict[],
  locations: Route[]
  vehicleType: string,
  babyTransport: boolean,
  petTransport: boolean,
  scheduledTime: Date;
}

export interface RideInfo{
    estimatedTimeInMinutes:number,
    estimatedCost: number,

}