import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root',
})
export class Interceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (req.headers.get('skip')) return next.handle(req);

    const accessToken: any = this.tokenService.getToken();
    const refreshToken: any = this.tokenService.getRefreshToken();

    if (accessToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + accessToken),
      });

      return next.handle(cloned).pipe(catchError((error: HttpErrorResponse) =>{

            if(error.status === 401){

              if(refreshToken){
                const refreshCloned = req.clone({
                  headers: req.headers.set('Authorization', 'Bearer ' + refreshToken),
                });

                return next.handle(refreshCloned).pipe(catchError((error2: HttpErrorResponse) => {

                  if(error2.status === 401){
                     this.tokenService.signOut();
                     this.router.navigate(['login']);
                  }
                  return throwError(error);
                }))
            }
          }
          return throwError(error);
      }
      ));

    } else {
        this.tokenService.signOut();
        this.router.navigate(['login']);
        return next.handle(req);
    }
  }
}
