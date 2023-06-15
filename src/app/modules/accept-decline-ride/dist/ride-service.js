"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RideService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var environment_1 = require("src/app/environments/environment");
var RideService = /** @class */ (function () {
    function RideService(http) {
        this.http = http;
        this.rideStatusChanged$ = new rxjs_1.BehaviorSubject(false);
        this.rideStatusChangedValue$ = this.rideStatusChanged$.asObservable();
        this.rideAccepted$ = new rxjs_1.BehaviorSubject(false);
        this.rideAcceptedValue$ = this.rideAccepted$.asObservable();
        this.activeRide$ = new rxjs_1.BehaviorSubject(false);
        this.activeRideValue$ = this.activeRide$.asObservable();
        this.rideStarted$ = new rxjs_1.BehaviorSubject(false);
        this.isRideStarted$ = this.rideStarted$.asObservable();
        this.rideEnded$ = new rxjs_1.BehaviorSubject(false);
        this.rideEndedValue$ = this.rideEnded$.asObservable();
    }
    RideService.prototype.setRideStatus = function (test) {
        this.rideStatusChanged$.next(test);
    };
    RideService.prototype.setRideAccepted = function (test) {
        this.rideAccepted$.next(test);
    };
    RideService.prototype.setRideStarted = function (started) {
        this.rideStarted$.next(started);
    };
    RideService.prototype.setActiveRide = function (test) {
        this.activeRide$.next(test);
    };
    RideService.prototype.setRideEnded = function (value) {
        this.rideEnded$.next(value);
    };
    RideService.prototype.get = function (rideId) {
        return this.http.get(environment_1.environment.apiHost + 'api/ride/' + rideId);
    };
    //   getReport(role: string, typeOfReport: string, from:Date, to: Date, driverId : number = null): Observable<Report>{
    //     const reportDTO = {
    //       role:role,
    //       driverId:driverId,
    //       typeOfReport:typeOfReport,
    //       from:from,
    //       to:to
    //     };
    //     return this.http.post<Report>(environment.apiHost + 'api/ride/rides-report', reportDTO);
    //   }
    RideService.prototype.orderARide = function (ride) {
        return this.http.post(environment_1.environment.apiHost + "api/ride/", ride);
    };
    RideService.prototype.cancelRide = function (rideId, rejection) {
        return this.http.put(environment_1.environment.apiHost + "api/ride/" + rideId + "/cancel", { reason: rejection });
    };
    RideService.prototype.acceptRide = function (id, ride) {
        return this.http.put(environment_1.environment.apiHost + "api/ride/" + id + "/accept", ride);
    };
    RideService.prototype.startRide = function (id) {
        return this.http.put(environment_1.environment.apiHost + "api/ride/" + id + "/start", {});
    };
    RideService.prototype.endRide = function (id) {
        return this.http.put(environment_1.environment.apiHost + "api/ride/" + id + "/end", {});
    };
    RideService.prototype.panicRide = function (id, reason) {
        return this.http.put(environment_1.environment.apiHost + 'api/ride/' + id + '/panic', { reason: reason });
    };
    RideService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], RideService);
    return RideService;
}());
exports.RideService = RideService;
