import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FavoriteRide } from '../../model/favorite-ride';
import { Favorite } from '../../model/favorites-row';
import { ProfileService } from '../../profile.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'departure',
    'destination',
    'vehicle_type',
    'baby',
    'pet',
  ];
  dataSource!: MatTableDataSource<Favorite>;
  rides: FavoriteRide[] = [];
  favorites: Favorite[] = [];
  condition: boolean = true;

  @ViewChild(MatSort) sort!: any;

  constructor(private profile: ProfileService) {}

  ngOnInit(): void {
    this.profile.getFavorites().subscribe({
      next: (result) => {
        this.rides = result;
        let rideTemp: Favorite = {
          name: undefined,
          departure: undefined,
          destination: undefined,
          vehicle_type: undefined,
          baby: undefined,
          pet: undefined
        }
        for(let ride of this.rides){
          rideTemp.name = ride.favoriteName;
          rideTemp.departure = ride.locations[0].departure.address;
          rideTemp.destination = ride.locations[0].destination.address;
          rideTemp.vehicle_type = ride.vehicleType;
          rideTemp.baby = ride.babyTransport;
          rideTemp.pet = ride.petTransport;

          this.favorites.push(rideTemp);
        }
        this.dataSource = new MatTableDataSource<Favorite>(this.favorites);
        console.log(this.favorites);
      },
      error: (error) => {},
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
