import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Token } from './model/token';
import { environment } from 'src/app/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt'; 
import { TokenService } from './token/token.service';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
     skip: 'true',
  });

  user$ = new BehaviorSubject<boolean>(false);
  userState$ = this.user$.asObservable();

  constructor(private http: HttpClient,
              private tokenService: TokenService) {
  }

  login(auth: any): Observable<Token> {
    return this.http.post<Token>(environment.apiHost + 'api/user/login', auth, {
      headers: this.headers,
    });
  }

  getRole(): any {
    if (this.isLoggedIn()) {
      const user: User = this.tokenService.getUser();
      return user.role;
    }
    return null;
  }

  getMail(): any {
    if (this.isLoggedIn()) {
      const user: User = this.tokenService.getUser();
      return user.email;
    }
    return null;
  }

  getId(): any {
    if (this.isLoggedIn()) {
      const user: User = this.tokenService.getUser();
      return user.id;
    }
    return null;
  }

  isLoggedIn(): any {
    if (this.tokenService.getUser() != null) {
      return true;
    }
    return false;
  }

  // setUser(): void {
  //   this.user$.next(this.getRole());
  // }
  
}
