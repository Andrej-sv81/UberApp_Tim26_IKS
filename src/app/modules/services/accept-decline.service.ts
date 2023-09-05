import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RideRequest} from "../passenger/request-ride/request-ride-model/ride-request";
import {Observable} from "rxjs";
import {RideResponse} from "../passenger/request-ride/request-ride-model/ride-response";
import {environment} from "../../environments/environment";
import {ExplanationDTO} from "../DTO/ExplanationDTO";

@Injectable({
  providedIn: 'root'
})
export class AcceptDeclineService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) { }

  acceptRide(id: number): Observable<RideResponse>{
    return this.http.put<RideResponse>(environment.apiHost + `api/ride/${id}/accept`,
      {
        headers: this.headers
      });
  }

  declineRide(id: number, explanation:ExplanationDTO): Observable<RideResponse>{
    return this.http.put<RideResponse>(environment.apiHost + `api/ride/${id}/cancel`,
      {
        headers: this.headers,
        body:explanation
      });
  }

}
