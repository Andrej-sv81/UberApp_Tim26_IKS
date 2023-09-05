import {LocationDTO} from "./locationDTO";
import {RejectionDTO} from "./rejectionDTO";
import {PassengerDTO} from "./passengerDTO";
import {DriverDTO} from "./driverDTO";

export interface  RideResponse{
        id: any;
        startTime: any;
        endTime: any;
        totalCost: any;
        driver: DriverDTO;
        passengers: PassengerDTO[];
        estimatedTimeInMinutes: any;
        vehicleType: any;
        babyTransport: any;
        petTransport: any;
        rejection: RejectionDTO;
        locations: LocationDTO[];
        status: any;
        scheduledTime: any;

}
