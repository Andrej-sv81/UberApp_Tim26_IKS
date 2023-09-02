import {Component, ViewChild, ViewChildren} from '@angular/core';
import {MapComponent} from "../../components/map/map.component";
import {MapService} from "../services/map.service";
import {UnregisteredService} from "./unregistered.service";

@Component({
  selector: 'app-unregistered',
  templateUrl: './unregistered.component.html',
  styleUrls: ['./unregistered.component.css']
})
export class UnregisteredComponent {
  startLocationAddress: string = "";
  endLocationAddress: string = "";
  onButtonClick() {
    // TODO route and send data to backend

  }

  constructor(private unregisterService: UnregisteredService) {

  }


  estimateTimeAndCost() {
    // @ts-ignore
    // this.startLocationAddress = document.getElementById("startLocation").value
    // @ts-ignore
    // this.endLocationAddress = document.getElementById("endLocation").value
    // this.unregisterService.setRoute([this.startLocationAddress, this.endLocationAddress])
  }
}
