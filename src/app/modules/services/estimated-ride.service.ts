import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {EstimatedReturn} from "../unregistered/models/return-estimated";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Estimated} from "../unregistered/models/request-estimated";

@Injectable({
  providedIn: 'root'
})
export class EstimatedRideService {
  private headers = new HttpHeaders({'Content-Type': 'application/json',
    skip: 'true',
  });

  constructor(private http:HttpClient) { }

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
  getEstimatedData(body:Estimated):Observable<EstimatedReturn>{
    return this.http.post<EstimatedReturn>(environment.apiHost + 'api/unregisteredUser/',
      body,
      {
        headers: this.headers
      });
  }
}
