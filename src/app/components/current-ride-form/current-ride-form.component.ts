import { Component } from '@angular/core';
import {RideResponseDTO} from "../../modules/DTO/RideResponseDTO";
import {ExplanationDTO} from "../../modules/DTO/ExplanationDTO";
import {AcceptDeclineService} from "../../modules/services/accept-decline.service";
import {RideService} from "../../modules/services/ride.service";
import {Router} from "@angular/router";
import {PassRideDataService} from "../../modules/services/pass-ride-data.service";
import {TokenService} from "../../modules/auth/token/token.service";

@Component({
  selector: 'app-current-ride-form',
  templateUrl: './current-ride-form.component.html',
  styleUrls: ['./current-ride-form.component.css']
})
export class CurrentRideFormComponent {
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
    const driverId = this.tokenService.getUser().id;
    this.rideService.activeRideDriver(driverId).subscribe({
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

  onEnd(){
    this.rideService.endRide(this.rideDetails.id).subscribe({
      next:(result)=>{
        this.router.navigateByUrl("/driver-home")
      }
    })
  }
}
