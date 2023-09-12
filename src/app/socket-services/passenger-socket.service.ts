import { Injectable } from '@angular/core';
import * as SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {RideResponse} from "../modules/passenger/request-ride/request-ride-model/ride-response";
import {LocationDTO} from "../modules/passenger/request-ride/request-ride-model/locationDTO";
import {RideResponseDTO} from "../modules/DTO/RideResponseDTO";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {MapService} from "../modules/services/map.service";

@Injectable({
  providedIn: 'root'
})
export class PassengerSocketService {

  constructor(private snackBar:MatSnackBar,public dialog: MatDialog,private mapService:MapService) { }

  notificationDisplayed: boolean = false;
  notificationQueue: RideResponseDTO[] = [];
  public stompClient:any;
  public msg:any = [];

  initializeWebSocketConnection(passengerId:any) {
    const serverUrl = 'http://localhost:8000/ws';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function() {
      that.openSocket(passengerId);
      //that.openInvitesSocket(passengerId);  TODO kad se implementira dodavanje prijatelja
      that.openVehicleLocationSocket(passengerId);
    });
  }

  openSocket(passengerId:any){
    this.stompClient.subscribe('/topic/passenger/ride/'+passengerId, (message:any) => {
      try{
        const ride: RideResponseDTO = JSON.parse(message.body);
        this.openSnackbar("Your ride status is: " + ride.status +  ".");
        console.log(ride);
      }
      catch{
        const error:String = message.body;
        console.log(error);
      }
    });
  }

  openVehicleLocationSocket(passengerId:any){
    this.stompClient.subscribe('/topic/vehicleLocation/ride/user/'+passengerId, (message:any) => {
      try{
        const location: LocationDTO = JSON.parse(message.body);
        console.log(location);
        //this.routeService.changeMarkerLocation(location);       TODO promeni marker na mapi
      }
      catch{
        console.log(message)
        return;
      }
    });
  }


  openSnackbar(message:string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }



}
