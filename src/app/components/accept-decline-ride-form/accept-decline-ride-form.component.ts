import {Component, Input, OnInit} from '@angular/core';
import {AcceptDeclineService} from "../../modules/services/accept-decline.service";
import {MapService} from "../../modules/services/map.service";
import {HttpHeaders} from "@angular/common/http";
import {RideResponseDTO} from "../../modules/DTO/RideResponseDTO";
import {ExplanationDTO} from "../../modules/DTO/ExplanationDTO";
import {ActivatedRoute, Router} from "@angular/router";
import {RideService} from "../../modules/services/ride.service";
import {PassRideDataService} from "../../modules/services/pass-ride-data.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-accept-decline-ride-form',
  templateUrl: './accept-decline-ride-form.component.html',
  styleUrls: ['./accept-decline-ride-form.component.css']
})
export class AcceptDeclineRideFormComponent implements OnInit{
  @Input() rideData:any;
  rideDetails!:RideResponseDTO;
  rejectInput:string='';
  rejectionReason : ExplanationDTO = {reason:""};
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

  constructor(private acceptDeclineService:AcceptDeclineService, private route:ActivatedRoute, private rideService:RideService,private router:Router,private rideDataService:PassRideDataService,private snackBar:MatSnackBar) {
  }

  onAccept(){
    this.acceptDeclineService.acceptRide(this.rideDetails.id).subscribe({
      next:(result) =>{
        this.router.navigateByUrl("/start-ride-driver");
      }
    });
  }

  onReject(){
    const inputElement = document.getElementById('rejectmsg');
    // @ts-ignore
    const inputValue = inputElement.value;
    if (inputValue!=''){
      const rejection:ExplanationDTO={reason:inputValue}
      this.acceptDeclineService.declineRide(this.rideDetails.id,rejection).subscribe({
        next:(result) =>{
          console.log("USPESNO ODBIJENA VOZNJA")
          this.router.navigateByUrl("/driver-home")
        }
      });
    }else {
      this.openSnackbar("Rejection reason input field is empty.");
    }

  }

  openSnackbar(message:string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }


}
