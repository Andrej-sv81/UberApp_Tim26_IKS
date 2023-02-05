import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FavoriteRide } from '../../model/favorite-ride';
import { Favorite } from '../../model/favorites-row';
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

  @ViewChild(MatSort) sort!: any;
  @ViewChild(MatPaginator) paginator!: any;

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
          rideTemp.departure = ride.locations[0].departure.address;
          rideTemp.destination = ride.locations[0].destination.address;
          rideTemp.cost = ride.totalCost;
          rideTemp.time = ride.estimatedTimeInMinutes;
          this.ridesTable.push(rideTemp);
        }

        this.dataSource = new MatTableDataSource<RideHistory>(this.ridesTable);
       
      },
      error: (error) => {},
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  details(){
    this.condition = !this.condition;
  }
}
