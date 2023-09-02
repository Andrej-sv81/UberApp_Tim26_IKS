import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
     skip: 'true',
  });
  constructor(private http: HttpClient) { }

  signUp(body: any): Observable<any> {
    return this.http.post<string>(environment.apiHost + 'api/passenger', body, {
      headers: this.headers,
    });
  }
}
