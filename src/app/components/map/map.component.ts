import {Component, AfterViewInit, Input, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import  * as L from 'leaflet';
import 'leaflet-routing-machine'
import { TokenService } from 'src/app/modules/auth/token/token.service';
import { Estimated } from 'src/app/modules/unregistered/models/request-estimated';
import { RideRequest } from '../../modules/passenger/request-ride/request-ride-model/ride-request';
import { RequestRideService } from '../../modules/services/request-ride.service';
import {MapService} from "../../modules/services/map.service";
import {LocationDTO} from "../../modules/passenger/request-ride/request-ride-model/locationDTO";
import {PassengerDTO} from "../../modules/passenger/request-ride/request-ride-model/passengerDTO";
import {EstimatedRideService} from "../../modules/services/estimated-ride.service";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnInit, OnDestroy{
  private map:any;


  @Output() data = new EventEmitter<{fromMap:string,toMap:string}>();

  ngOnInit() {
    this.estimatedService.selectedRouteCoords$.subscribe({
      next: (value) => {
        if(value[0] !== 0 && value[1] !== 0 && value[2] !== 0 && value[3] !== 0){  //moguc error kod praznih stringova na pocetnom ucitavanju unregistered strane
          this.route(value[0],value[1],value[2],value[3]);
        }
      }
    })
    this.requestRideService.selectedRouteCoords$.subscribe({
      next: (value) => {
        if(value[0] !== 0 && value[1] !== 0 && value[2] !== 0 && value[3] !== 0){
          this.route(value[0],value[1],value[2],value[3]);
        }
      }
    })
  }


  constructor(private mapService:MapService, private estimatedService:EstimatedRideService, private requestRideService:RequestRideService) {}

  private initMap(): void {
    this.map = L.map('map',{
      center: [45.2396, 19.8227],
      zoom: 14,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);

  }

  search(street:string): void {
    this.mapService.search(street).subscribe({
      next: (result) => {
        console.log(result);
        L.marker([result[0].lat, result[0].lon])
          .addTo(this.map)
          .bindPopup('Pozdrav iz Strazilovske 19.')
          .openPopup();
      },
      error: () => {},
    });
  }

  registerOnClick(): void {
    this.map.on('click', (e: any) => {
      const coord = e.latlng;
      const lat = coord.lat.float;
      const lng = coord.lng.float;
      this.mapService.reverseSearch(parseFloat(lat), parseFloat(lng)).subscribe((res) => {
        console.log(res.toString());
      });
      console.log(
        'You clicked the map at latitude: ' + lat + ' and longitude: ' + lng
      );

      // alert(mp.getLatLng());
    });
  }

  route(lat1: any, lon1: any, lat2: any, lon2: any ): void {
    console.log(lat1);
    console.log(lon1);
    console.log(lat2);
    console.log(lon2);
    L.Routing.control({waypoints: [L.latLng(lat1, lon1), L.latLng(lat2, lon2)]}).addTo(this.map);
    console.log("NESTO POSLE")

  }

  private addMarker(): void {
    const lat: number = 45.25;
    const lon: number = 19.8228;
  }

  ngAfterViewInit(): void {
    let DefaultIcon = L.icon({
      iconUrl: 'https://icons.iconarchive.com/icons/graphicloads/colorful-long-shadow/256/Car-icon.png',
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    this.initMap();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }


}
