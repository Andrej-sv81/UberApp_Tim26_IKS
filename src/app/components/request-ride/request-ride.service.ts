import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { RideRequest } from './request-ride-model/ride-request';
import { RideResponse } from './request-ride-model/ride-response';

@Injectable({
  providedIn: 'root'
})
export class RequestRideService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }

  createRide(body: RideRequest): Observable<RideResponse>{
    return this.http.post<RideResponse>(environment.apiHost + 'api/ride',
    body,
    {
      headers: this.headers
    });
  }

}
