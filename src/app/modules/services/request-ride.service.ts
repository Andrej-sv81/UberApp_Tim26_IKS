import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { RideRequest } from '../passenger/request-ride/request-ride-model/ride-request';
import { RideResponse } from '../passenger/request-ride/request-ride-model/ride-response';

@Injectable({
  providedIn: 'root'
})
export class RequestRideService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  requestRoute$ = new BehaviorSubject<[string, string]>(["", ""])
  selectedRoute$ = this.requestRoute$.asObservable();
  requestRouteCoords$ = new BehaviorSubject<[any,any,any,any]>([0,0,0,0])
  selectedRouteCoords$ = this.requestRouteCoords$.asObservable();

  setRoute(list: [string, string])
  {
    this.requestRoute$.next(list)
  }

  setRouteCoords(list: [any,any,any,any])
  {
    this.requestRouteCoords$.next(list)
  }

  constructor(private http: HttpClient) { }

  createRide(body: RideRequest): Observable<RideResponse>{
    return this.http.post<RideResponse>(environment.apiHost + 'api/ride',
      body,
    {
      headers: this.headers
    });
  }

}
