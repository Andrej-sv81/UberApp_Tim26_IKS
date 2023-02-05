import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Ride } from '../../model/ride';
import { RideHistory } from '../../model/ride-history';
import { ProfileService } from '../../profile.service';

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

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
}


  constructor(private profile: ProfileService, private router: Router) {}

  ngOnInit(): void {
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

  ngAfterViewInit() {
  
  }

  details(id: number){
    for(let ride of this.ridesResult){
      if(ride.id === id){
        this.departure = ride.locations[0].departure.address;
        this.destination = ride.locations[0].destination.address;
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
        }
          break;
       } 
    
  }
    this.condition = !this.condition;
  }
  back(){
    this.condition = !this.condition;
  }
}
