import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class Interceptor implements HttpInterceptor{

  constructor(private tokenService: TokenService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>>
  {
    const accessToken: any = this.tokenService.getToken();
    if (req.headers.get('skip')) return next.handle(req);

    if (accessToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer '+accessToken),
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
