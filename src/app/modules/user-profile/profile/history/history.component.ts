import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FavoriteRequestOne } from '../../model/favorite-request';
import { Passenger } from '../../model/passenger';
import { Ride } from '../../model/ride';
import { RideHistory } from '../../model/ride-history';
import { ProfileService } from '../../profile.service';
import { TokenService } from 'src/app/modules/auth/token/token.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit{
  displayedColumns: string[] = [
    'departure',
    'destination',
    'cost',
    'time',
    'details'
  ];
  dataSource!: MatTableDataSource<RideHistory>;
  ridesResult: Ride[] = [];
  ridesTable: RideHistory[] = [];
  condition: boolean = true;

  // <--------Details---------->

  departure: any;
  destination: any;
  stime: any;
  etime: any;
  cost: any;
  time: any;
  pet!: boolean;
  baby!: boolean
  driver: any;
  rejection: any;
  passengers: any[] = []; 

  latDep: any;
  lonDep: any;
  latDes: any;
  lonDes: any;
  passengersReq: Passenger[] = [];
  vehicle: any;


  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
}
  

favForm = new FormGroup({
  favNameField: new FormControl('', [Validators.required]),
});

hasError: boolean = false;
passenger: boolean = false;

  constructor(private profile: ProfileService, private router: Router, private token: TokenService) {}

  ngOnInit(): void {
    if(this.token.getUser().role === 'ROLE_PASSENGER'){
      this.passenger = true;
     }

    this.profile.getRides().subscribe({
      next: (result) => {
        this.ridesResult = result.results;
        for(let ride of this.ridesResult){
          let rideTemp: RideHistory = {
            id: undefined,
            departure: undefined,
            destination: undefined,
            cost: undefined,
            time: undefined
          }
          rideTemp.id = ride.id;
          rideTemp.departure = ride.locations[0].departure.address;
          rideTemp.destination = ride.locations[0].destination.address;
          rideTemp.cost = ride.totalCost;
          rideTemp.time = ride.estimatedTimeInMinutes;
          this.ridesTable.push(rideTemp);
        }

        this.dataSource = new MatTableDataSource<RideHistory>(this.ridesTable);
        this.dataSource.paginator = this.paginator;
    
       
      },
      error: (error) => {},
    });
  }

  leaveReview(){
  
  }

  ngAfterViewInit() {
  
  }

  details(id: number){
    for(let ride of this.ridesResult){
      if(ride.id === id){
        this.departure = ride.locations[0].departure.address;
        this.latDep = ride.locations[0].departure.latitude;
        this.lonDep = ride.locations[0].departure.longitude;
        this.destination = ride.locations[0].destination.address;
        this.latDes = ride.locations[0].destination.latitude;
        this.lonDes = ride.locations[0].destination.longitude;
        this.stime = ride.startTime;
        this.etime = ride.endTime;
        this.cost = ride.totalCost;
        this.time = ride.estimatedTimeInMinutes;
        this.pet = ride.petTransport;
        this.baby = ride.babyTransport;
        this.driver = ride.driver.email;
        this.rejection = ride.rejection.reason;
        for(let passenger of ride.passengers){
          this.passengers.push(passenger.email);
          this.passengersReq.push({id: passenger.id, email: passenger.email});
        }
        this.vehicle = ride.vehicleType;
          break;
       } 
    
  }
    this.condition = !this.condition;
  }
  back(){
    this.condition = !this.condition;
  }

  favorite(){
    if(this.favForm.valid){
    const favReq: FavoriteRequestOne = {
      favoriteName: this.favForm.value.favNameField,
      locations: [
        {
          departure: {
            address: this.departure,
            latitude: this.latDep,
            longitude: this.lonDep,
          },
          destination: {
            address: this.destination,
            latitude: this.latDes,
            longitude: this.lonDes,
          }
        }
      ],
      passengers: this.passengersReq,
      vehicleType: this.vehicle,
      babyTransport: this.baby,
      petTransport: this.pet
    }

    this.profile.addFavorite(favReq).subscribe({
      next: (result)=>{

      },
      error: (error)=>{

      }
    })
  }else{
    this.hasError = true;
  }
}


}
