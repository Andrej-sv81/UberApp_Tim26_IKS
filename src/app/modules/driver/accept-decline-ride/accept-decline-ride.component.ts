import {Component, OnInit} from '@angular/core';
import {AcceptDeclineService} from "../../services/accept-decline.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RideService} from "../../services/ride.service";
import {
  AcceptDeclineRideFormComponent
} from "../../../components/accept-decline-ride-form/accept-decline-ride-form.component";
import {PassRideDataService} from "../../services/pass-ride-data.service";

@Component({
  selector: 'app-accept-decline-ride',
  templateUrl: './accept-decline-ride.component.html',
  styleUrls: ['./accept-decline-ride.component.css']
})
export class AcceptDeclineRideComponent implements OnInit{

  constructor(private acceptDeclineService:AcceptDeclineService,private passDataService:PassRideDataService) {
  }
  ngOnInit(): void {

  }

}
