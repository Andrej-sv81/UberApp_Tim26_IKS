import { Injectable } from '@angular/core';
import * as SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {LocationDTO} from "../modules/passenger/request-ride/request-ride-model/locationDTO";
import {RideResponseDTO} from "../modules/DTO/RideResponseDTO";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {PassRideDataService} from "../modules/services/pass-ride-data.service";

@Injectable({
  providedIn: 'root'
})
export class DriverSocketService {

  constructor(private router:Router, private rideDataService:PassRideDataService) { }

  notificationDisplayed: boolean = false;
  notificationQueue: RideResponseDTO[] = [];
  public stompClient:any;
  public msg:any = [];
  initializeWebSocketConnection(driverId:any) {
    const serverUrl = 'http://localhost:8080/ws';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function() {
      that.openSocket(driverId);
      //that.openVehicleLocationSocket(driverId);
    });
  }

  openSocket(driverId:any){
    this.stompClient.subscribe('/topic/driver/ride/' + driverId, (message:any) => {
      try{
        // TODO RESI SLANJE PORUKE
        const ride: RideResponseDTO = JSON.parse(message.body);
        this.rideDataService.setRideData(ride);
        this.router.navigateByUrl('/accept-decline-ride/' + ride.id);
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
