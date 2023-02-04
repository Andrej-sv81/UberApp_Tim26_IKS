import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/app/environments/environment';
import { TokenService } from '../auth/token/token.service';
import { PassengerDetails } from './model/passenger-data-res';
import { PassengerUpdate } from './model/passanger-update-req'
import { ChangePassword } from './model/change-password';
import { FavoriteRide } from './model/favorite-ride';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private headers = new HttpHeaders({
  });
  private headersJSON = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient, private token: TokenService) { }

  loadPassenger(): Observable<PassengerDetails>{
    return this.http.get<PassengerDetails>(environment.apiHost + 'api/passenger/' + this.token.getUser().id,
     {
      headers: this.headers
    });
  }

  updatePassenger(body: PassengerUpdate): Observable<PassengerDetails>{
      return this.http.put<PassengerDetails>(environment.apiHost + 'api/passenger/' + this.token.getUser().id,
      body,
      {
        headers: this.headersJSON
      })
  }

  changePassword(body: ChangePassword): Observable<any>{
      return this.http.put<any>(environment.apiHost + 'api/user/' + this.token.getUser().id +'/changePassword',
      body,
      {
        headers: this.headersJSON
      })
  }

  getFavorites(): Observable<FavoriteRide[]>{
      return this.http.get<FavoriteRide[]>(environment.apiHost + 'api/ride/favorites',
      {
        headers: this.headersJSON
      })
  }
    
}
