import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {

  constructor() { }

  ReturnMonthlyRides(): number[]{
    return [65, 59, 80, 81, 56, 55, 40, 23, 2, 100, 57, 87];
  }

  ReturnMonthlyEarnings(): number[]{
    return [456, 259, 180, 281, 356, 585, 450, 233, 211, 1020, 537, 87];
  }
}
