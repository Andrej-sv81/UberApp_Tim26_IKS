import {Component, OnInit} from '@angular/core';
import {Stomp} from '@stomp/stompjs';
import * as sockJS from 'sockjs-client';
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DriverService } from './driver.service';

@Component({
  selector: 'app-driver-home',
  templateUrl: './driver-home.component.html',
  styleUrls: ['./driver-home.component.css']
})
export class DriverHomeComponent implements OnInit{
  private stompClient:any;
  private isLoaded:boolean = false;
  private driverId:number = 2;

  constructor(private router: Router, private service: DriverService) {
  }


  ngOnInit() {
    this.createWebSocket();
  }

  handleToggle(event: MatSlideToggleChange){
    const value = event.checked;
    console.log(value);
    this.service.changeState(value).subscribe((result)=>{
      console.log(result);
    })
  }
  
  createWebSocket(){
    let that = this;
    this.stompClient = Stomp.over(function (){return new sockJS(environment.apiHost+"socket")});
    this.stompClient.connect({},function (){
      that.isLoaded = true;
      that.connectToSocket();
    })
  }

  connectToSocket() {
        if (this.isLoaded){
          this.stompClient.subscribe("/rideOut/"+ this.driverId,(response :any) => {
            console.log(JSON.parse(response.body));
            // this.router.navigateByUrl("/accept-decline-ride")
          })
        }
    }
}
