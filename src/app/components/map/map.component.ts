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
import * as stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { latLng, tileLayer, marker, geoJSON, LayerGroup, icon } from 'leaflet';
import { carMarker } from './car-icon';
import { RideInfo, RideInfoBody, CreateRideDTO, RideSimulationDTO, VehicleSimulationDTO, Ride, FavoriteRide } from 'src/app/components/model/Ride';
import { Router } from '@angular/router';



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

  role: string = '';
  id: number = 0;
//simulation___________________________________

vehicles: any = {};
rides: any = {};
mainGroup: LayerGroup[] = [];
stompClient: any;
stompSimulation: any;
rideEnded = false;

//__________________________________________________
  @Output() data = new EventEmitter<{fromMap:string,toMap:string}>();
  
  @Input()
  acceptRide: any;
  rideService: any;
  rideAccepted: boolean = false;
  waitingForRide: boolean = false;
  rideAssumption: any;
  acceptNotification: boolean = false;
  currentRoute: any;
  rideDeclined: any;
 

  ngOnInit() {
    this.unregService.selectedRoute$.subscribe({
      next: (value) => {
        if(value[0] !== "" && value[1] !== ""){  //moguc error kod praznih stringova na pocetnom ucitavanju unregistered strane
          this.estimateTimeAndCost(value[0], value[1]); 
        }
      }
    })

    this.id = this.token.getUser().id;
    this.role = this.token.getUser().role;
    //simulation_______________________________________________

    this.initializeSocketSimulationConnection();

    //_______________________________________________________
  }

  sendData(){
    this.data.emit({fromMap:this.clickedFrom,toMap:this.clickedTo})
  }

  constructor(private mapService:MapService, private unregService: UnregisteredService, private token: TokenService, private request: RequestRideService, private router: Router) {}

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

    this.rideService.rideEndedValue$.subscribe((value: boolean) =>{
      this.rideEnded = value;
    })


    this.rideService.isRideStarted$.subscribe((value: boolean) =>{
      if(value === true){

        if (this.currentRoute != null) {
          this.map.removeControl(this.currentRoute);
        }

        const route = L.Routing.control({
          waypoints: [L.latLng(this.acceptRide.locations[0].departure.latitude, this.acceptRide.locations[0].departure.longitude),
          L.latLng(this.acceptRide.locations[0].destination.latitude, this.acceptRide.locations[0].destination.longitude)],
          show: false,
          routeWhileDragging: true,
        }).addTo(this.map);

        this.currentRoute = route;
      }
    })

    this.rideService.rideStatusChangedValue$.subscribe((value: any) => {
      this.rideDeclined = value;
    });
    
    this.rideService.rideAcceptedValue$.subscribe((value: boolean) =>{
      this.rideAccepted = value;
    })

    this.rideService.activeRideValue$.subscribe((value: boolean) =>{
      this.rideAccepted = value;
      if (this.currentRoute != null) {
        this.map.removeControl(this.currentRoute);
      }
      if(this.rideAccepted == true){
          if (this.currentRoute != null) {
            this.map.removeControl(this.currentRoute);
          }
          const route = L.Routing.control({
            waypoints: [L.latLng(this.acceptRide.locations[0].departure.latitude, this.acceptRide.locations[0].departure.longitude),
            L.latLng(this.acceptRide.locations[0].destination.latitude, this.acceptRide.locations[0].destination.longitude)],
            show: false,
            routeWhileDragging: true,
          }).addTo(this.map);
          this.currentRoute = route;
      }
    })
    
  }


  async createRide(){

    try {
      const fromResult = await this.mapService.search(this.from).toPromise();
      const toResult = await this.mapService.search(this.to).toPromise();
  
      if (fromResult.length === 0 || toResult.length === 0) {
        // Handle the case where the search results are empty
        return;
      }
    
      this.latDeparture = fromResult[0].lat;
      this.lonDeparture = fromResult[0].lon;
      this.latDestination = toResult[0].lat;
      this.lonDestination = toResult[0].lon;

    let fromRide:LocationDTO = {
      address:this.from,
      latitude:this.latDeparture,
      longitude:this.lonDeparture,
    }
    let toRide:LocationDTO = {
      address:this.from,
      latitude:this.latDestination,
      longitude:this.lonDestination,
    }

    let passenger:PassengerDTO = {
      id: this.token.getUser().id,
      email: this.token.getUser().email,
    }

    let req: RideRequest = {
      locations: [{departure: fromRide, destination: toRide}],
      passengers: [passenger],
      vehicleType: this.vehicle,
      babyTransport: this.baby,
      petTransport: this.pet,
      scheduledTime: ""
    }
  


    this.request.createRide(req).subscribe({
      next: (result)=>{
      },
      error: (error)=>{

            }
    })

    this.route(parseFloat(this.latDeparture), parseFloat(this.lonDeparture),
    parseFloat(this.latDestination), parseFloat(this.lonDestination));
  }catch{}

}



  //simulation_______________________________________________________



  initializeSocketSimulationConnection(){
      let ws = new SockJS('http://localhost:8080/simulation');
      this.stompSimulation = stomp.Stomp.over(ws);
      this.stompSimulation.debug = null;
      let that = this;
      this.stompSimulation.connect({}, function () {
        that.openSimulationSocket();
      });
  }
  openSimulationSocket(){
    this.stompSimulation.subscribe('/map-updates', (message: {body: string}) =>{
      const newLocation = JSON.parse(message.body);
      const vehicle = this.vehicles[newLocation.id];
      vehicle.setIcon(carMarker);
      vehicle.setLatLng([newLocation.longitude, newLocation.latitude]);

      if (this.role === 'DRIVER') {
        this.setDriverSockets();
  
  
      } else if (this.role === 'PASSENGER') {
        this.setPassengerSockets();
      }

    });

    }

    setPassengerSockets() {

      this.stompClient.subscribe('/passenger/ride/' + this.id, (message: { body: string; }) => {
        console.log(message);
        if (message.body === "You have a scheduled ride!") {
          alert("You have a scheduled ride!");
        } else if (message.body === "No suitable driver found!") {
          alert("No suitable driver found!");
        }
        else {
          this.acceptRide = JSON.parse(message.body);
          if (this.acceptRide.status === "ACCEPTED") {
            this.rideService.setPanicPressed(null);
  
            this.rideService.setRideEnded(false);
            this.rideAccepted = true;
            this.acceptRide.estimatedTimeInMinutes = Math.round(this.acceptRide.estimatedTimeInMinutes * 100) / 100;
            this.waitingForRide = false;
            this.rideService.setActiveRide(true);
            this.mapService.simulateRide(this.acceptRide.id).subscribe({
              next: (result) => {
              },
              error: (error) => {
              }
            });
  
          } else if (this.acceptRide.status === "REJECTED" || this.acceptRide.status == "CANCELED") {
            alert('Your ride was rejected');
            this.rideService.setPanicPressed(null);
  
            this.clearMap();
            this.rideAssumption.estimatedCost = 0;
            this.rideAssumption.estimatedTimeInMinutes = 0;
            this.waitingForRide = false;
            this.rideAccepted = false;
          }
        }
      }
  
      );


      this.stompClient.subscribe('/passenger/start-ride/' + this.id, (message: { body: string; }) => {
        let ride = JSON.parse(message.body);
        this.rideService.setRideStarted(true);
        this.rideService.setRideEnded(false);
        this.rideService.setPanicPressed(null);
  
  
        this.mapService.simulateRide(ride.id).subscribe({
          next: (result) => {
            console.log(result);
          },
          error: (error) => {
            console.log(error);
          }
        });
        console.log(message);
      });
  
      this.stompClient.subscribe('/passenger/end-ride/' + this.id, (message: { body: string; }) => {
        let ride = JSON.parse(message.body);
        console.log(message.body);
        this.rideService.setRideEnded(true);
        this.mapService.get(ride.driver.id).subscribe({
          next: (result) => {
            this.vehicles[result.id].setIcon(carMarker);
            this.rideService.setActiveRide(false);
            this.rideService.setRideAccepted(false);
            this.rideService.setRideStarted(false);
            this.router.navigate(['/profile/review:' + ride.id]);
  
          },
          error: (error) => {
            console.log(error);
          }
        });
      });
    }


  clearMap()
  {
    
  }

    setDriverSockets(){


      this.stompClient.subscribe('/driver/ride/' + this.id, (message: { body: string; }) => {
        console.log(message);
        this.rideService.setRideEnded(false);
        this.rideService.setPanicPressed(null);
        this.rideService.setRideStatus(false);
        this.acceptRide = JSON.parse(message.body);
        this.acceptRide.estimatedTimeInMinutes = Math.round(this.acceptRide.estimatedTimeInMinutes * 100) / 100;
        this.acceptNotification = true;
        this.router.navigate(['/accept-decline-ride']);
      });

      this.stompClient.subscribe('/driver/start-ride/' + this.id, (message: { body: string; }) => {
        let ride = JSON.parse(message.body);
        this.rideService.setRideEnded(false);
        this.rideService.setPanicPressed(null);
        this.rideService.setRideStarted(true);
        this.mapService.simulateRide(ride.id).subscribe({
          next: (result) => {
            console.log(result);
          },
          error: (error) => {
            console.log(error);
          }
        });
        console.log(message);
      });
  
      this.stompClient.subscribe('/driver/end-ride/' + this.id, (message: { body: string; }) => {
        let ride = JSON.parse(message.body);
        this.rideService.setRideEnded(true);
        this.mapService.get(ride.driver.id).subscribe({
          next: (result) => {
            this.vehicles[result.id].setIcon(carMarker);
            this.rideAccepted = false;
            this.rideService.setActiveRide(false);
            this.router.navigate(['/driver-home']);
          },
          error: (error) => {
            console.log(error);
          }
        });
      });
    }

    // ngAfterViewInit(): void {


    //   if(this.isOnlyMap) {
    //     if(this.destinationRideInfo !== '' && this.departureRideInfo !== ''){
    //       this.search(this.departureRideInfo);
    //       this.search(this.destinationRideInfo, true);
    //     }
    //     return;
    //   }
  
  
    //   this.vehicleService.getVehicleTypes()
    //     .subscribe(
    //       (vehicleTypes) => (this.vehicleTypes = vehicleTypes)
    //     );
  
    //   this.rideService.getFavoriteRides()
    //   .subscribe(
    //     (rides) => (this.favoriteRides = rides)
    //   );
  
    //   // get all vehicles not in an active ride currently
    //   // then simulate their pins
  
    //   this.rideService.getAllActiveRidesWithIds().subscribe({
    //     next:(result) =>{
    //       console.log(result);
    //         for(const rideLoc of result){
    //           if(this.vehicles[rideLoc.vehicleId] && this.acceptRide.id !== rideLoc.rideId){
    //               this.vehicles[rideLoc.vehicleId].setIcon(redCar);
    //           }
    //         }
  
    //     },
    //     error:(error) =>{
  
    //     }
    //   })
    //   this.vehicleService.getAllLocations()
    //                       .subscribe(
    //                         (locations) => {
    //                           this.vehicleLocations = locations;
    //                           for(const location of this.vehicleLocations){
  
    //                             if(location.available === true){
  
    //                               const vehicleMarker = L.marker([location.latitude, location.longitude],
    //                                 {icon:greenCar}).addTo(this.map);
    //                               this.vehicles[location.id] = vehicleMarker;
    //                             }else{
    //                               const vehicleMarker = L.marker([location.latitude, location.longitude], {icon:redCar}).addTo(this.map);
    //                               this.vehicles[location.id] = vehicleMarker;
    //                             }
  
    //                           }
    //                         }
    //                       );
    //   if(this.destinationRideInfo !== '' && this.departureRideInfo !== ''){
    //     this.search(this.departureRideInfo);
    //     this.search(this.destinationRideInfo, true);
    //   }
  
    // }
  

    
  }

  



