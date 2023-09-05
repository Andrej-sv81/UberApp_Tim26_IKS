import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {RideResponse} from "../passenger/request-ride/request-ride-model/ride-response";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RideService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(private http: HttpClient) { }

  rideDetails(id: number): Observable<RideResponse>{
    return this.http.get<RideResponse>(environment.apiHost + `api/${id}/accept`,
      {
        headers: this.headers
      });
  }
}
