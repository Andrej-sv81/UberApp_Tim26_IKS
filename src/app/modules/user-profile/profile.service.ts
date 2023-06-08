import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/app/environments/environment';
import { TokenService } from '../auth/token/token.service';
import { UserDetails } from './model/user-data-res';
import { UserUpdate } from './model/user-update'
import { ChangePassword } from './model/change-password';
import { FavoriteRide } from './model/favorite-ride';
import { Rides } from './model/rides';
import { FavoriteRequestOne } from './model/favorite-request';
import { Review } from './model/review';
import { PasswordCode } from './model/password-code';

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

  loadUser(): Observable<UserDetails>{
    if(this.token.getUser().role === 'ROLE_PASSENGER'){

      return this.http.get<UserDetails>(environment.apiHost + 'api/passenger/' + this.token.getUser().id,
      {
        headers: this.headers
      });

    }else{

      return this.http.get<UserDetails>(environment.apiHost + 'api/driver/' + this.token.getUser().id,
      {
        headers: this.headers
      });

    }

  }

  updateUser(body: UserUpdate): Observable<UserDetails>{
    if(this.token.getUser().role === 'ROLE_PASSENGER'){
      return this.http.put<UserDetails>(environment.apiHost + 'api/passenger/' + this.token.getUser().id,
      body,
      {
        headers: this.headersJSON
      })
    }else{
      return this.http.put<UserDetails>(environment.apiHost + 'api/driver/' + this.token.getUser().id,
      body,
      {
        headers: this.headersJSON
      })
    }
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

  deleteFavorite(id: number): Observable<any>{
    return this.http.delete<any>(environment.apiHost + 'api/ride/favorites/' + id, 
    {
      headers: this.headersJSON
    })
  }

  getRides():Observable<Rides>{
    return this.http.get<Rides>(environment.apiHost + 'api/user/' + this.token.getUser().id + '/ride', 
    {
      headers: this.headersJSON
    })
  }

  addFavorite(body: FavoriteRequestOne): Observable<FavoriteRide>{
    return this.http.post<FavoriteRide>(environment.apiHost + 'api/ride/favorites',
    body,
    {
      headers: this.headersJSON
    })
  }

  sendReviewVehicle(body: Review, id: number): Observable<any>{
    return this.http.post<Review>(environment.apiHost + 'api/review/' + id + '/vehicle',
    body,
    {
      headers: this.headersJSON
    })
  }

  sendReviewDriver(body: Review, id: number): Observable<any>{
    return this.http.post<Review>(environment.apiHost + 'api/review/' + id + '/driver',
    body,
    {
      headers: this.headersJSON
    })
  }

  resetEmailRequest(email: string): Observable<any>{
    return this.http.get(environment.apiHost + 'api/user/resetPassword?email=' + email)
  }

  resetPassword(email: string, body: PasswordCode): Observable<any>{
    return this.http.put<PasswordCode>(environment.apiHost + 'api/user/resetPassword?email=' + email,
    body,
    {
      headers: this.headersJSON
    })
  }
    
}
