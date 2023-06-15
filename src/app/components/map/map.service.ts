import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import { environment } from "src/app/environments/environment";
import { Vehicle } from "../model/Vehicle";

@Injectable({
  providedIn: 'root',
})
export class MapService {


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


  get(driverId:number):Observable<Vehicle>{
    return this.http.get<Vehicle>(environment.apiHost + 'api/driver/' + driverId + '/vehicle');
    
  }

  simulateRide(rideId: number):Observable<String>{
    return this.http.put<String>(environment.apiHost + 'api/vehicle/simulation/' + rideId, {});
  }
}
