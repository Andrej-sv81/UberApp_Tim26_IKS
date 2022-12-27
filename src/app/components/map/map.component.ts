import { Component , AfterViewInit} from '@angular/core';
import  * as L from 'leaflet';
import 'leaflet-routing-machine'
import {MapService} from "./map.service";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit{
  private map:any;

  constructor(private mapService:MapService) {}

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

    //this.search();
    //this.addMarker();
    //this.registerOnClick();
    //this.route();
  }

  ngAfterViewInit(): void {
    let DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    this.initMap();
  }
}
