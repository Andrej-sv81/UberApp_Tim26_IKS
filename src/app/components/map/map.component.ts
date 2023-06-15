import {Component, AfterViewInit, Input, Output, EventEmitter, OnInit} from '@angular/core';
import  * as L from 'leaflet';
import 'leaflet-routing-machine'
import { TokenService } from 'src/app/modules/auth/token/token.service';
import { Estimated } from 'src/app/modules/unregistered/models/request-estimated';
import { UnregisteredService } from 'src/app/modules/unregistered/unregistered.service';
import { RideRequest } from '../request-ride/request-ride-model/ride-request';
import { RequestRideService } from '../request-ride/request-ride.service';
import {MapService} from "./map.service";
import {LocationDTO} from "../request-ride/request-ride-model/locationDTO";
import {PassengerDTO} from "../request-ride/request-ride-model/passengerDTO";
import {Client} from '@stomp/stompjs'
import * as SockJS from 'sockjs-client';
import { latLng, tileLayer, marker, geoJSON, LayerGroup, icon } from 'leaflet';
import { Ride } from '../model/Ride';
import { Vehicle } from '../model/Vehicle';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnInit{
  private map:any;
  private clickedFrom = '';
  private clickedTo = ''
  @Input() from = ''; // start location from form
  @Input() to = ''; //end location from form
  @Input() baby = false;
  @Input() pet = false;
  @Input() vehicle = 'STANDARD';

  private latDeparture: string = '';
  private lonDeparture: string = '';
  private latDestination: string = '';
  private lonDestination: string = '';

  public price: number = 0;
  public time: number = 0;
//simulation___________________________________

vehicles: any = {};
rides: any = {};
mainGroup: LayerGroup[] = [];
private stompClient: any;

//__________________________________________________
  @Output() data = new EventEmitter<{fromMap:string,toMap:string}>();

  ngOnInit() {
    this.unregService.selectedRoute$.subscribe({
      next: (value) => {
        if(value[0] !== "" && value[1] !== ""){  //moguc error kod praznih stringova na pocetnom ucitavanju unregistered strane
          this.estimateTimeAndCost(value[0], value[1]); 
        }
      }
    })

    //simulation_______________________________________________

    this.initializeWebSocketConnection();

    this.mapService.getRide().subscribe((ret: any) => {

        let color = Math.floor(Math.random() * 16777215).toString(16);
        let geoLayerRouteGroup: LayerGroup = new LayerGroup();

        for (let step of JSON.parse(ret.routeJSON)['routes'][0]['legs'][0]['steps']) {
          let routeLayer = geoJSON(step.geometry);
          routeLayer.setStyle({ color: `#${color}` });
          routeLayer.addTo(geoLayerRouteGroup);
          this.rides[ret.id] = geoLayerRouteGroup;
        }
        let markerLayer = marker([ret.vehicle.longitude, ret.vehicle.latitude], {
          icon: icon({
            iconUrl: 'assets/car.png',
            iconSize: [35, 45],
            iconAnchor: [18, 45],
          }),
        });
        markerLayer.addTo(geoLayerRouteGroup);
        this.vehicles[ret.vehicle.id] = markerLayer;
        this.mainGroup = [...this.mainGroup, geoLayerRouteGroup];
      
    });

    //_______________________________________________________
  }

  sendData(){
    this.data.emit({fromMap:this.clickedFrom,toMap:this.clickedTo})
  }

  constructor(private mapService:MapService, private unregService: UnregisteredService, private token: TokenService, private request: RequestRideService) {}

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
    this.mainGroup.forEach((layer: L.LayerGroup) => {
      layer.addTo(this.map); // Add each layer to the map
    });
    //this.search();
    // this.addMarker();
    // this.registerOnClick();
    //this.route();
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
        console.log("FROM PROBA:" + this.clickedFrom);
        console.log("TO PROBA:" + this.clickedTo);
      });
      console.log(
        'You clicked the map at latitude: ' + lat + ' and longitude: ' + lng
      );

      // alert(mp.getLatLng());
    });
  }

  route(lat1: number, lon1: number, lat2: number, lon2: number ): void {
      L.Routing.control({
      waypoints: [L.latLng(lat1, lon1), L.latLng(lat2, lon2)],
    }).addTo(this.map);

  }

  estimateTimeAndCost(fromLoc: string, toLoc: string){
    this.from = fromLoc;
    this.to = toLoc;
    console.log(this.from)
    console.log(this.to)
    this.mapService.search(this.from).subscribe({
      next: (result) => {
        this.latDeparture = result[0].lat;
        this.lonDeparture = result[0].lon;
        console.log(this.latDeparture, this.lonDeparture)

        this.mapService.search(this.to).subscribe({
          next: (result) => {
            this.latDestination = result[0].lat;
            this.lonDestination = result[0].lon;
            console.log(this.latDestination, this.lonDestination)

            const from:LocationDTO = {
              address:this.from,
              latitude:this.latDeparture,
              longitude:this.latDeparture,
            }
            const to:LocationDTO = {
              address:this.to,
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
              babyTransport:true,
              petTransport:true,
            }

            estim.locations.push(ride);

            this.unregService.getEstimated(estim).subscribe({
              next: (result)=>{
                this.price = result.estimatedCost;
                this.time = result.estimatedTimeInMinutes;
              }
            })


            this.route(parseFloat(this.latDeparture), parseFloat(this.lonDeparture),
              parseFloat(this.latDestination), parseFloat(this.lonDestination));
          },
          error: (error)=>{
            console.log(error);
          }
        });


      },
      error: (error)=>{
          console.log(error);
      }
    });




  }
  private addMarker(): void {
    const lat: number = 45.25;
    const lon: number = 19.8228;
  }

  ngAfterViewInit(): void {
    let DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    this.initMap();
  }


  createRide(){

    this.mapService.search(this.from).subscribe({
      next: (result) => {
        this.latDeparture = result[0].lat;
        this.lonDeparture = result[0].lon;
      },
      error: (error)=>{
          console.log(error);
      }
    });

    this.mapService.search(this.to).subscribe({
      next: (result) => {
        this.latDestination = result[0].lat;
        this.lonDestination = result[0].lon;
      },
      error: (error)=>{
        console.log(error);
      }
    });

    const fromRide:LocationDTO = {
      address:this.from,
      latitude:this.latDeparture,
      longitude:this.latDeparture,
    }
    const toRide:LocationDTO = {
      address:this.from,
      latitude:this.latDestination,
      longitude:this.lonDestination,
    }

    const passenger:PassengerDTO = {
      id: this.token.getUser().id,
      email: this.token.getUser().email,
    }

    const req: RideRequest = {
      locations: [],
      passengers: [],
      vehicleType: this.vehicle,
      babyTransport: this.baby,
      petTransport: this.pet,
      scheduledTime: undefined
    }

    req.locations.push(fromRide);
    req.locations.push(toRide);
    req.passengers.push(passenger);

    this.request.createRide(req).subscribe({
      next: (result)=>{
      },
      error: (error)=>{

            }
    })

    this.route(parseFloat(this.latDeparture), parseFloat(this.lonDeparture),
    parseFloat(this.latDestination), parseFloat(this.lonDestination));
  }



  //simulation_______________________________________________________



  initializeWebSocketConnection() {
    let ws = new SockJS('http://localhost:8080/socket');
    this.stompClient = new Client();
    this.stompClient.brokerURL = ws;
    this.stompClient.debug = null;
    let that = this;
    this.stompClient.connect({}, function () {
      that.openGlobalSocket();
    });

    this.stompClient.activate();
  }


  openGlobalSocket() {
    this.stompClient.subscribe('/map-updates/update-vehicle-position', (message: { body: string }) => {
      let vehicle: Vehicle = JSON.parse(message.body);
      let existingVehicle = this.vehicles[vehicle.id];
      existingVehicle.setLatLng([vehicle.longitude, vehicle.latitude]);
      existingVehicle.update();
    });


    this.stompClient.subscribe('/map-updates/new-ride', (message: { body: string }) => {
      let ride: Ride = JSON.parse(message.body);
      let geoLayerRouteGroup: LayerGroup = new LayerGroup();
      let color = Math.floor(Math.random() * 16777215).toString(16);
      for (let step of JSON.parse(ride.routeJSON)['routes'][0]['legs'][0]['steps']) {
        let routeLayer = geoJSON(step.geometry);
        routeLayer.setStyle({ color: `#${color}` });
        routeLayer.addTo(geoLayerRouteGroup);
        this.rides[ride.id] = geoLayerRouteGroup;
      }
      let markerLayer = marker([ride.vehicle.longitude, ride.vehicle.latitude], {
        icon: icon({
          iconUrl: 'assets/car.png',
          iconSize: [35, 45],
          iconAnchor: [18, 45],
        }),
      });
      markerLayer.addTo(geoLayerRouteGroup);
      this.vehicles[ride.vehicle.id] = markerLayer;
      this.mainGroup = [...this.mainGroup, geoLayerRouteGroup];
    });


    this.stompClient.subscribe('/map-updates/ended-ride', (message: { body: string }) => {
      let ride: Ride = JSON.parse(message.body);
      this.mainGroup = this.mainGroup.filter((lg: LayerGroup) => lg !== this.rides[ride.id]);
      delete this.vehicles[ride.vehicle.id];
      delete this.rides[ride.id];
    });


    this.stompClient.subscribe('/map-updates/delete-all-rides', (message: { body: string }) => {
      this.vehicles = {};
      this.rides = {};
      this.mainGroup = [];
    });
  }
}
