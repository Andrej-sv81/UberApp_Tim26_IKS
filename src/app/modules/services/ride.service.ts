import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {RideResponse} from "../passenger/request-ride/request-ride-model/ride-response";
import {environment} from "../../environments/environment";
import {RideResponseDTO} from "../DTO/RideResponseDTO";
import {LocationDTO} from "../passenger/request-ride/request-ride-model/locationDTO";

@Injectable({
  providedIn: 'root'
})
export class RideService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(private http: HttpClient) { }

  private vehicleLocation$ = new BehaviorSubject<any>({});
  selectedVehicleLocation$ = this.vehicleLocation$.asObservable();
  updateVehicleLocation(update:LocationDTO){
    this.vehicleLocation$.next(update);
  }

  rideDetails(id: number): Observable<RideResponseDTO>{
    return this.http.get<RideResponseDTO>(environment.apiHost + `api/ride/${id}`,
      {
        headers: this.headers
      });
  }

  startRide(id:number): Observable<RideResponseDTO>{
    return this.http.put<RideResponseDTO>(environment.apiHost + `api/ride/${id}/start`,
      {
        headers: this.headers
      });
  }

  endRide(id:number): Observable<RideResponseDTO>{
    return this.http.put<RideResponseDTO>(environment.apiHost + `api/ride/${id}/end`,
      {
        headers: this.headers
      });
  }

  simulateRide(id:number): Observable<string>{
    return this.http.put<string>(environment.apiHost + `api/simulate/${id}`,
      {
        headers: this.headers
      });
  }

  activeRidePassenger(id:number): Observable<RideResponseDTO>{
    return this.http.get<RideResponseDTO>(environment.apiHost + `api/ride/passenger/${id}/active`,
      {
        headers: this.headers
      });
  }

  activeRideDriver(id:number): Observable<RideResponseDTO>{
    return this.http.get<RideResponseDTO>(environment.apiHost + `api/ride/driver/${id}/active`,
      {
        headers: this.headers
      });
  }


}
