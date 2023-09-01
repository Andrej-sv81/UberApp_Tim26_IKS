import { Injectable } from '@angular/core';
import * as SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {LocationDTO} from "../components/request-ride/request-ride-model/locationDTO";
import {RideResponseDTO} from "../modules/DTO/RideResponseDTO";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class DriverSocketService {

  constructor(private snackBar: MatSnackBar) { }

  notificationDisplayed: boolean = false;
  notificationQueue: RideResponseDTO[] = [];
  public stompClient:any;
  public msg:any = [];
  initializeWebSocketConnection(driverId:any) {
    const serverUrl = 'http://localhost:8000/ws';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function() {
      that.openSocket(driverId);
      that.openVehicleLocationSocket(driverId);
    });
  }

  openSocket(driverId:any){
    this.stompClient.subscribe('/topic/driver/ride/'+driverId, (message:any) => {
      try{
        const ride: RideResponseDTO = JSON.parse(message.body);
        if(ride.status == "PENDING" || ride.status == "SCHEDULED"){
          if (this.notificationDisplayed) {
            // Add notification to queue if there is already one being displayed
            this.notificationQueue.push(ride);
          } else {
            console.log("VRACENO:" + ride);
            // Display notification immediately if there isn't one being displayed
            //this.displayNotification(ride);
          }
        }
        else{
          //this.setReturnRide(ride);
        }
      }
      catch{
        const error:String = message.body;
        console.log(error);
        //this.setReturnError(error);
      }

    });
  }



  openVehicleLocationSocket(driverId:any){
    this.stompClient.subscribe('/topic/vehicleLocation/ride/user/'+driverId, (message:any) => {
      try{
        const location: LocationDTO = JSON.parse(message.body);
        console.log(location);
        //this.routeService.changeMarkerLocation(geoLocation);     TODO add marker on map
      }
      catch{
        return;
      }
    });
  }



}
