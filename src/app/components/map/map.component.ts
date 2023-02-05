import {Component, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
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
  private clickedFrom = '';
  private clickedTo = ''
  @Input() from = ''; // start location from form
  @Input() to = ''; //end location from form


  @Output() data = new EventEmitter<{fromMap:string,toMap:string}>();

  sendData(){
    this.data.emit({fromMap:this.clickedFrom,toMap:this.clickedTo})
  }

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
    this.addMarker();
    this.registerOnClick();
    this.route();
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
        // TODO PROVERI ZASTO NE RADI IZBACUJE DA OCEKUJE FLOAT SVAKI PUT
        // if (this.clickedFrom=''){
        //   this.clickedFrom = res.toString();
        //   const mp = new L.Marker([lat, lng]).addTo(this.map);
        // }else if (this.clickedTo=''){
        //   this.clickedTo = res.toString();
        //   const mp = new L.Marker([lat, lng]).addTo(this.map);
        // }else {
        //   console.log("Refresh page.");
        // }
        console.log("FROM PROBA:" + this.clickedFrom);
        console.log("TO PROBA:" + this.clickedTo);
      });
      console.log(
        'You clicked the map at latitude: ' + lat + ' and longitude: ' + lng
      );

      // alert(mp.getLatLng());
    });
  }

  route(): void {
    L.Routing.control({
      waypoints: [L.latLng(57.74, 11.94), L.latLng(57.6792, 11.949)],
    }).addTo(this.map);
    console.log(this.mapService.search(this.from));
  }

  private addMarker(): void {
    const lat: number = 45.25;
    const lon: number = 19.8228;

    // L.marker([lat, lon])
    //   .addTo(this.map)
    //   .bindPopup('Trenutno se nalazite ovde.')
    //   .openPopup();
  }

  ngAfterViewInit(): void {
    let DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    this.initMap();
  }
}
