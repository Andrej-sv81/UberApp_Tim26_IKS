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
  selectedRoute$ = this.requestRoute$.asObservable();

  setRoute(list: [string, string])
  {
    this.requestRoute$.next(list)
  }

  getEstimated(body: Estimated): Observable<EstimatedReturn>{
    return this.http.post<EstimatedReturn>(environment.apiHost + 'api/unregisteredUser/',
    body,
    {
      headers: this.headers
    });
  }


}
