import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Token } from './model/token';
import { environment } from 'src/app/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt'; 
import { TokenService } from './token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
     skip: 'true',
  });

  // user$ = new BehaviorSubject(null);
  // userState$ = this.user$.asObservable();

  constructor(private http: HttpClient,
              private tokenService: TokenService) {
    //this.user$.next(this.getRole());
  }

  login(auth: any): Observable<Token> {
    return this.http.post<Token>(environment.apiHost + 'api/user/login', auth, {
      headers: this.headers,
    });
  }

  // getRole(): any {
  //   if (this.isLoggedIn()) {
  //     const accessToken: any = localStorage.getItem('user');
  //     const helper = new JwtHelperService();
  //     const role = helper.decodeToken(accessToken).role[0].authority; //TODO  
  //     return role;
  //   }
  //   return null;
  // }

  isLoggedIn(): boolean {
    if (this.tokenService.getUser() != null) {
      return true;
    }
    return false;
  }

  // setUser(): void {
  //   this.user$.next(this.getRole());
  // }
  
}
