import {Component, ViewChild, ViewChildren} from '@angular/core';
import {MapComponent} from "../../components/map/map.component";
import {MapService} from "../services/map.service";

@Component({
  selector: 'app-unregistered',
  templateUrl: './unregistered.component.html',
  styleUrls: ['./unregistered.component.css']
})
export class UnregisteredComponent {

  onButtonClick() {
    // TODO route and send data to backend

  }

  constructor() {

  }


}
