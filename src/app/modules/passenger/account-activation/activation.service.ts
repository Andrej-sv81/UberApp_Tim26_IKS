import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivationService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
     skip: 'true',
  });

  constructor(private http: HttpClient) { }

  activateAccount(id: string): Observable<any>{
      return this.http.get(environment.apiHost + 'api/passenger/activate/'+ id, {
        headers: this.headers,
      } ) 
  }
}
