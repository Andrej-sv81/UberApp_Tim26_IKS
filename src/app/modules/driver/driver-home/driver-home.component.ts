import {Component, OnInit} from '@angular/core';
import {Stomp} from '@stomp/stompjs';
import * as sockJS from 'sockjs-client';
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DriverService } from './driver.service';
import {TokenService} from "../../auth/token/token.service";
import {DriverSocketService} from "../../../socket-services/driver-socket.service";
import {BehaviorSubject} from "rxjs";
import {RideResponseDTO} from "../../DTO/RideResponseDTO";
import {RideResponse} from "../../passenger/request-ride/request-ride-model/ride-response";

@Component({
  selector: 'app-driver-home',
  templateUrl: './driver-home.component.html',
  styleUrls: ['./driver-home.component.css']
})
export class DriverHomeComponent implements OnInit{
  private stompClient:any;
  private isLoaded:boolean = false;
  driverId:number = 0;


  constructor(private router: Router, private service: DriverService, private tokenService:TokenService, private driverSocketService:DriverSocketService) {
  }


  ngOnInit() {
    this.driverId = this.tokenService.getUser().id;
    this.driverSocketService.initializeWebSocketConnection(this.driverId);
  }

  handleToggle(event: MatSlideToggleChange){
    const value = event.checked;
    console.log(value);
    this.service.changeState(value).subscribe((result)=>{
      console.log(result);
    })
  }

}
