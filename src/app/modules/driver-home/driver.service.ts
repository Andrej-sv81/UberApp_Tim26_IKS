import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../auth/token/token.service';
import { environment } from 'src/app/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private headers = new HttpHeaders({
  });
  private headersJSON = new HttpHeaders({
    'Content-Type': 'application/json'
  });


  constructor(private http: HttpClient, private token: TokenService) { }

  changeState(state: boolean): Observable<any>{
    return this.http.put<boolean>(environment.apiHost + 'api/driver/' + this.token.getUser().id + "/activity?status="+state, {});
  }
}
