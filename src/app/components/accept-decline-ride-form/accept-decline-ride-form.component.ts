import {Component, Input, OnInit} from '@angular/core';
import {AcceptDeclineService} from "../../modules/services/accept-decline.service";
import {MapService} from "../../modules/services/map.service";
import {HttpHeaders} from "@angular/common/http";
import {RideResponseDTO} from "../../modules/DTO/RideResponseDTO";
import {ExplanationDTO} from "../../modules/DTO/ExplanationDTO";
import {ActivatedRoute, Router} from "@angular/router";
import {RideService} from "../../modules/services/ride.service";
import {PassRideDataService} from "../../modules/services/pass-ride-data.service";

@Component({
  selector: 'app-accept-decline-ride-form',
  templateUrl: './accept-decline-ride-form.component.html',
  styleUrls: ['./accept-decline-ride-form.component.css']
})
export class AcceptDeclineRideFormComponent implements OnInit{
  @Input() rideData:any;
  rideDetails!:RideResponseDTO;
  rejectionReason !: ExplanationDTO;
  id:any;
  departure:any;
  destination:any;
  scheduled:any;
  time:any;
  price:any;

  ngOnInit(): void {
    this.rideDataService.selectedRideData$.subscribe({
      next:(data)=>{
        console.log("FORMA ON INIT, DATA:" + data);
        console.log(data);
        this.rideDetails = data;
        this.setData(data);
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

  constructor(private acceptDeclineService:AcceptDeclineService, private route:ActivatedRoute, private rideService:RideService,private router:Router,private rideDataService:PassRideDataService) {
  }

  onAccept(){
    this.acceptDeclineService.acceptRide(this.rideDetails.id).subscribe({
      next:(result) =>{
        // RUTIRAJ NA CURRENT RIDE
        console.log("PRIHVACENA VOZNJA")
        if (result.status==200){
          this.router.navigateByUrl("/current-ride-driver/"+this.rideDetails.id);
        }
      }
    });
  }

  onReject(){
    this.acceptDeclineService.declineRide(this.rideDetails.id,this.rejectionReason).subscribe({
      next:(result) =>{
        console.log("USPESNO ODBIJENA VOZNJA")
        if (result.status==200){
          this.router.navigateByUrl("/driver-home")
        }
      }
    });
  }


}
