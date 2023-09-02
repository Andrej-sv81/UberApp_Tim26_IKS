import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/app/environments/environment';
import { Estimated } from './models/request-estimated';
import { EstimatedReturn } from './models/return-estimated';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UnregisteredService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
     skip: 'true',
  });

  constructor(private http: HttpClient) { }

  requestRoute$ = new BehaviorSubject<[string, string]>(["", ""])
  requestRouteCoords$ = new BehaviorSubject<[any,any,any,any]>(["","","",""])
  selectedRoute$ = this.requestRoute$.asObservable();
  selectedCoords$ = this.requestRouteCoords$.asObservable();

  setRoute(list: [string, string])
  {
    this.requestRoute$.next(list)
  }

  setCoords(list:[any,any,any,any]){
    this.requestRouteCoords$.next(list)
  }

  getEstimated(body: Estimated): Observable<EstimatedReturn>{
    return this.http.post<EstimatedReturn>(environment.apiHost + 'api/unregisteredUser/',
    body,
    {
      headers: this.headers
    });
  }


}
