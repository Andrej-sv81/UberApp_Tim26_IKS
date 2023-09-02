import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class MapService {

  private headers = new HttpHeaders({'Content-Type': 'application/json',
    skip: 'true',
  });
  constructor(private http: HttpClient) {}
  //constructor() {}

  search(street:string):Observable<any>{
    return this.http.get(
      'https://nominatim.openstreetmap.org/search?format=json&q=' + street,{headers:this.headers}
    );
  }

  reverseSearch(lat:number,lon:number): Observable<any>{
    return this.http.get(
      'https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&<params>'
    );
  }
}
