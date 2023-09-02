import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EstimatedRideService} from "../../modules/services/estimated-ride.service";


@Component({
  selector: 'app-ride-estimated-form',
  templateUrl: './ride-estimated-form.component.html',
  styleUrls: ['./ride-estimated-form.component.css']
})
export class RideEstimatedFormComponent implements OnInit{
  estimatedForm: FormGroup;
  departure:any;
  destination:any;

  constructor(private fb: FormBuilder, private estimatedService:EstimatedRideService) {
    this.estimatedForm = this.fb.group({
      departure: [''],
      destination: [''],
    });

  }

  submit(){

  }

  ngOnInit(): void {
      throw new Error('Method not implemented.');
  }




}
