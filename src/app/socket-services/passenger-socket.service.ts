import { Injectable } from '@angular/core';
import * as SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {RideResponse} from "../components/request-ride/request-ride-model/ride-response";
import {LocationDTO} from "../components/request-ride/request-ride-model/locationDTO";
import {RideResponseDTO} from "../modules/DTO/RideResponseDTO";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class PassengerSocketService {

  constructor(private snackBar:MatSnackBar,public dialog: MatDialog) { }

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
      //that.openNotificationSocket(passengerId);   TODO kad se implementira zakazivanje za buducnost

    });
  }

  openSocket(passengerId:any){
    this.stompClient.subscribe('/topic/passenger/ride/'+passengerId, (message:any) => {
      try{
        const ride: RideResponseDTO = JSON.parse(message.body);
        console.log(ride);
        //this.setReturnRide(ride);
        this.openDialog(ride);
      }
      catch{
        const error:String = message.body;
        console.log(error);
        //this.setReturnError(error);
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

  openDialog(ride:RideResponseDTO): void {
    let msg = ''
    let message = ride.status;
    if (message == "ACCEPTED")
    {
      msg = "Your ride was accepted!"
    }
    if (message == "CANCELED")
    {
      msg = "Your ride was canceled!"
    }
    if (message == "REJECTED")
    {
      msg = "Your ride was rejected!"
    }
    if (message == "ACTIVE")
    {
      msg = "Your ride has started!"
    }
    if (message == "FINISHED")
    {
      msg = "Your ride is over!"
      //TODO add ride review
      return
    }
  }


}
