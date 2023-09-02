import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EstimatedRideService} from "../../modules/services/estimated-ride.service";
import {MapService} from "../../modules/services/map.service";
import {LocationDTO} from "../request-ride/request-ride-model/locationDTO";
import {Estimated} from "../../modules/unregistered/models/request-estimated";
import {error} from "@angular/compiler-cli/src/transformers/util";


@Component({
  selector: 'app-ride-estimated-form',
  templateUrl: './ride-estimated-form.component.html',
  styleUrls: ['./ride-estimated-form.component.css']
})
export class RideEstimatedFormComponent implements OnInit{
  estimatedForm: FormGroup;
  departure:any;
  latDeparture:any;
  lonDeparture:any;
  destination:any;
  latDestination:any;
  lonDestination:any;
  price:any;
  time:any;

  constructor(private fb: FormBuilder, private estimatedService:EstimatedRideService, private mapService:MapService) {
    this.estimatedForm = this.fb.group({
      departure: [''],
      destination: [''],
    });

  }

  submit(){
    this.departure = this.estimatedForm.get('departure')?.value;
    this.destination = this.estimatedForm.get('destination')?.value;
    console.log("DEPARTURE:" + this.departure);
    console.log("DESTINATION" + this.destination);

    this.mapService.search(this.departure).subscribe({
      next: (result) => {
        this.latDeparture = result[0].lat;
        this.lonDeparture = result[0].lon;
        console.log("REZULTAT POLAZISTE:",this.latDeparture,this.lonDeparture);

        this.mapService.search(this.destination).subscribe({
          next: (result) => {
            this.latDestination = result[0].lat;
            this.lonDestination = result[0].lon;
            console.log("REZULTAT DESTINACIJA:",this.latDestination,this.lonDestination);

            const from:LocationDTO = {
              address:this.departure,
              latitude:this.latDeparture,
              longitude:this.latDeparture,
            }
            const to:LocationDTO = {
              address:this.destination,
              latitude:this.latDestination,
              longitude:this.lonDestination,
            }
            let ride = {
              departure: from,
              destination: to,
            }
            const estim: Estimated = {
              locations:[],
              vehicleType:'STANDARD',
              babyTransport:false,
              petTransport:false,
            }

            const coords :[any,any,any,any] = [this.latDeparture,this.lonDeparture,this.latDestination,this.lonDestination];
            estim.locations.push(ride);


            this.estimatedService.getEstimatedData(estim).subscribe({
              next: (result) =>{
                console.log("ESTIMATED DATA USO")
                this.price = result.estimatedCost;
                this.time = result.estimatedTimeInMinutes;
                this.estimatedService.setRouteCoords(coords);
                console.log("POSLE CRTANJA RUTE")
              }
            })
          },
          error:(error)=>{
            console.log(error);
        }
        })
        console.log()
      },
      error:(error)=>{
        console.log(error);
      }
    })

  }


  ngOnInit(): void {
  }




}
