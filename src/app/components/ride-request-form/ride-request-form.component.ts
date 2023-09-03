import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EstimatedRideService} from "../../modules/services/estimated-ride.service";
import {MapService} from "../../modules/services/map.service";
import {RequestRideService} from "../../modules/services/request-ride.service";
import {LocationDTO} from "../../modules/passenger/request-ride/request-ride-model/locationDTO";
import {Estimated} from "../../modules/unregistered/models/request-estimated";
import {RideRequest} from "../../modules/passenger/request-ride/request-ride-model/ride-request";
import {RouteDTO} from "../../modules/passenger/request-ride/request-ride-model/routeDTO";
import {TokenService} from "../../modules/auth/token/token.service";
import {PassengerDTO} from "../../modules/passenger/request-ride/request-ride-model/passengerDTO";

@Component({
  selector: 'app-ride-request-form',
  templateUrl: './ride-request-form.component.html',
  styleUrls: ['./ride-request-form.component.css']
})
export class RideRequestFormComponent {
  requestRideForm: FormGroup;
  departure:any;
  latDeparture:any;
  lonDeparture:any;
  destination:any;
  latDestination:any;
  lonDestination:any;
  price:any;
  time:any;
  baby:boolean=false;
  petFlag:boolean=false;
  vehicleType:string="";
  passengersRide:PassengerDTO[] = [];
  rideRoute:any;
  scheduledTime:string = "";


  constructor(private fb: FormBuilder, private requestRideService:RequestRideService, private mapService:MapService, private tokenService:TokenService) {
    this.requestRideForm = this.fb.group({
      departure: [''],
      destination: [''],
      vehicleType: [''],          // Initial value can be set here
      baby: [false],              // Initial value can be set here
      petFlag: [false]
    });
  }

  createRequest(){
    this.departure = this.requestRideForm.get('departure')?.value;
    this.destination = this.requestRideForm.get('destination')?.value;

    this.mapService.search(this.departure).subscribe({
      next: (result) => {
        this.latDeparture = result[0].lat;
        this.lonDeparture = result[0].lon;

        this.mapService.search(this.destination).subscribe({
          next: (result2) => {
            this.latDestination = result2[0].lat;
            this.lonDestination = result2[0].lon;
            const from = this.createLocationDTO(this.departure, this.latDeparture, this.lonDeparture);
            const to = this.createLocationDTO(this.destination, this.latDestination, this.lonDestination);
            this.rideRoute = this.createRouteDTO(from, to);
            const mainPassenger = this.createMainPassenger();
            this.passengersRide.push(mainPassenger);
            const coords :[any,any,any,any] = [this.latDeparture,this.lonDeparture,this.latDestination,this.lonDestination];
            const request = this.createRideRequestDTO();

            this.requestRideService.createRide(request).subscribe({
              next: (result) =>{
                this.requestRideService.setRouteCoords(coords);
                console.log("POSLAT JE ZAHTEV ZA VOZNJU")
                console.log(result);
              }
            })
          },
          error:(error)=>{
            console.log(error);
          }
        })
        console.log()
      },
      error:(error)=>{
        console.log(error);
      }
    })

  }


  private createLocationDTO(address: string, latitude: number, longitude: number): LocationDTO {
    return {
      address,
      latitude,
      longitude,
    };
  }

  private createRouteDTO(departure: LocationDTO, destination: LocationDTO): RouteDTO {
    return {
      departure,
      destination,
    };
  }

  private createMainPassenger(): PassengerDTO{
    return {
      id : this.tokenService.getUser().id,
      email: this.tokenService.getUser().email
    };
  }

  private createRideRequestDTO(): RideRequest{
    return {
      locations: [this.rideRoute], // You should provide appropriate values for these properties
      passengers: this.passengersRide,
      vehicleType: this.requestRideForm.get("vehicleType")?.value, // You can provide the initial values as needed
      babyTransport: this.requestRideForm.get("baby")?.value,
      petTransport: this.requestRideForm.get("petFlag")?.value,
      scheduledTime: this.scheduledTime
    };
  }
}
