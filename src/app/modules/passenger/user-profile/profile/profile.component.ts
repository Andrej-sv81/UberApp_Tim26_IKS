import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../../auth/token/token.service';
import {PassengerSocketService} from "../../../../socket-services/passenger-socket.service";
import {DriverSocketService} from "../../../../socket-services/driver-socket.service";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit{

  constructor(private router: Router, private token: TokenService,private passengerSocket:PassengerSocketService,private driverSocket:DriverSocketService){}
  public passenger: boolean = false;
  ngOnInit(): void
  {
    let userId = this.token.getUser().id;
    console.log("USER ID U PROFILU:" + userId);
   if(this.token.getUser().role === 'ROLE_PASSENGER'){
    this.passenger = true;
    this.passengerSocket.initializeWebSocketConnection(userId);
   }else {
     this.driverSocket.initializeWebSocketConnection(userId);
   }
  }

}
