import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {RideResponseDTO} from "../DTO/RideResponseDTO";

@Injectable({
  providedIn: 'root'
})
export class PassRideDataService {
  rideData$ = new BehaviorSubject<any>(null);   // RIDE RESPONSE
  selectedRideData$ = this.rideData$.asObservable();
  setRideData(ride: RideResponseDTO)
  {
    this.rideData$.next(ride);
  }
  constructor() { }
}
