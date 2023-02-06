import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/app/environments/environment';
import { Estimated } from './models/request-estimated';
import { EstimatedReturn } from './models/return-estimated';

@Injectable({
  providedIn: 'root'
})
export class UnregisteredService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
     skip: 'true',
  });
  
  constructor(private http: HttpClient) { }

  getEstimated(body: Estimated): Observable<EstimatedReturn>{
    return this.http.post<EstimatedReturn>(environment.apiHost + 'api/unregisteredUser/',
    body,
    {
      headers: this.headers
    });
  }


}
