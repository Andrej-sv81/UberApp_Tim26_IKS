import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/app/environments/environment';
import { TokenService } from 'src/app/modules/auth/token/token.service';
import { Reports } from '../model/reports';
@Injectable({
  providedIn: 'root'
})
export class ReportService{

  constructor(private http: HttpClient, private token: TokenService) { }
  private headers = new HttpHeaders({
  });


  ReturnMonthlyStats(): Observable<Reports>{
    return this.http.get<Reports>(environment.apiHost + 'api/driver/report/' + this.token.getUser().id,
    {
      headers: this.headers
    });
  }


}
