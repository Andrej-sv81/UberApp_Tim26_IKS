import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private headers = new HttpHeaders({
  });

  getRide()
  {
    return this.http.put(environment.apiHost + "api/ride/1/acceptSim", null,
    {
      headers: this.headers
    })
  }
  constructor(private http: HttpClient) {}
  //constructor() {}

  search(street:string):Observable<any>{
    return this.http.get(
      'https://nominatim.openstreetmap.org/search?format=json&q=' + street
    );
  }

  reverseSearch(lat:number,lon:number): Observable<any>{
    return this.http.get(
      'https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&<params>'
    );
  }
}
