import { Component, Input } from '@angular/core';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-request-ride',
  templateUrl: './request-ride.component.html',
  styleUrls: ['./request-ride.component.css']
})
export class RequestRideComponent {
  public babyFlag: boolean = false;
  public petFlag: boolean = false;
  public vehicle: string = 'STANDARD';



  saveBFlag(val: boolean){
    this.babyFlag = val;
  }
  savePFlag(val: boolean){
    this.petFlag = val;
  }


}
