import { Component, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MapService } from 'src/app/components/map/map.service';
import { Ride } from 'src/app/components/model/Ride';
import { RideDTO } from 'src/app/components/request-ride/request-ride-model/rideDTO';
import { RideService } from './ride-service';

@Component({
  selector: 'app-accept-decline-ride',
  templateUrl: './accept-decline-ride.component.html',
  styleUrls: ['./accept-decline-ride.component.css']
})
export class AcceptDeclineRideComponent {
  @Input()
  acceptRide!: Ride;
  @Input()
  role!: string;
  rideDeclined = false;

  rejectionForm = new FormGroup({
    reason: new FormControl('', [Validators.required]),
  });

  constructor(private rideService: RideService, private mapService: MapService, private router: Router){}
  acceptRideOrder(){

    this.rideService.acceptRide(this.acceptRide.id, this.acceptRide).subscribe({
      next:(result: { id: number; }) =>{
        console.log(result);
        this.rideService.setRideStatus(true);
        this.rideService.setActiveRide(true);
        this.mapService.simulateRide(result.id).subscribe({
          next:(result)=>{console.log(result);},
          error:(error) =>{console.log(error);}
        })
      }
  });

  }
  ngOnInit(): void {
    this.rideService.rideStatusChangedValue$.subscribe((rideDeclined: boolean) => {
      this.rideDeclined = rideDeclined;
    });

  }


  // submitRideRejection(){
  //   this.rideService.cancelRide(this.acceptRide.id, this.rejectionForm.value.reason).subscribe({
  //     next:(result: any) =>{
  //       console.log(result);
  //       this.rideService.setRideStatus(this.rideDeclined);
  //     },
  //     error:(error: any) =>{console.log(error);}
  // });
  // }

  declineRide(){
    this.rideDeclined = true;
    
  }
}
