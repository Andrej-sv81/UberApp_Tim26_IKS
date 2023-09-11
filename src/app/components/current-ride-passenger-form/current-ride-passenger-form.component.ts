import { Component } from '@angular/core';
import {RideResponseDTO} from "../../modules/DTO/RideResponseDTO";
import {ExplanationDTO} from "../../modules/DTO/ExplanationDTO";
import {AcceptDeclineService} from "../../modules/services/accept-decline.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RideService} from "../../modules/services/ride.service";
import {PassRideDataService} from "../../modules/services/pass-ride-data.service";
import {TokenService} from "../../modules/auth/token/token.service";

@Component({
  selector: 'app-current-ride-passenger-form',
  templateUrl: './current-ride-passenger-form.component.html',
  styleUrls: ['./current-ride-passenger-form.component.css']
})
export class CurrentRidePassengerFormComponent {

  rideDetails!:RideResponseDTO;
  rejectInput: string = "";
  rejectionReason : ExplanationDTO = {reason:""};
  id:any;
  departure:any;
  destination:any;
  scheduled:any;
  time:any;
  price:any;

  ngOnInit(): void {
    const passengerId = this.tokenService.getUser().id;
    this.rideService.activeRidePassenger(passengerId).subscribe({
      next:(result)=>{
        this.setData(result);
      }
    })
  }

  setData(ride:RideResponseDTO):void{
    this.rideDetails = ride;
    this.id = ride.id;
    this.destination = ride.locations[0].destination.address;
    this.departure = ride.locations[0].departure.address;
    this.price = ride.totalCost;
    this.time = ride.estimatedTimeInMinutes;
    this.scheduled = "NOW";
  }
  // TODO ODMAH PO INICIJALIZACIJI HITAJ ENDPOINT
  constructor(private acceptDeclineService:AcceptDeclineService, private rideService:RideService,private router:Router,private rideDataService:PassRideDataService,private tokenService:TokenService) {
  }





}
