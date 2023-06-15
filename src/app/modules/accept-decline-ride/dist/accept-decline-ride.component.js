"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AcceptDeclineRideComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var AcceptDeclineRideComponent = /** @class */ (function () {
    function AcceptDeclineRideComponent(rideService, mapService, router) {
        this.rideService = rideService;
        this.mapService = mapService;
        this.router = router;
        this.rideDeclined = false;
        this.rejectionForm = new forms_1.FormGroup({
            reason: new forms_1.FormControl('', [forms_1.Validators.required])
        });
    }
    AcceptDeclineRideComponent.prototype.acceptRideOrder = function () {
        var _this = this;
        this.rideService.acceptRide(this.acceptRide.id, this.acceptRide).subscribe({
            next: function (result) {
                console.log(result);
                _this.rideService.setRideStatus(true);
                _this.rideService.setActiveRide(true);
                _this.mapService.simulateRide(result.id).subscribe({
                    next: function (result) { console.log(result); },
                    error: function (error) { console.log(error); }
                });
            }
        });
    };
    AcceptDeclineRideComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.rideService.rideStatusChangedValue$.subscribe(function (rideDeclined) {
            _this.rideDeclined = rideDeclined;
        });
    };
    // submitRideRejection(){
    //   this.rideService.cancelRide(this.acceptRide.id, this.rejectionForm.value.reason).subscribe({
    //     next:(result: any) =>{
    //       console.log(result);
    //       this.rideService.setRideStatus(this.rideDeclined);
    //     },
    //     error:(error: any) =>{console.log(error);}
    // });
    // }
    AcceptDeclineRideComponent.prototype.declineRide = function () {
        this.rideDeclined = true;
    };
    __decorate([
        core_1.Input()
    ], AcceptDeclineRideComponent.prototype, "acceptRide");
    __decorate([
        core_1.Input()
    ], AcceptDeclineRideComponent.prototype, "role");
    AcceptDeclineRideComponent = __decorate([
        core_1.Component({
            selector: 'app-accept-decline-ride',
            templateUrl: './accept-decline-ride.component.html',
            styleUrls: ['./accept-decline-ride.component.css']
        })
    ], AcceptDeclineRideComponent);
    return AcceptDeclineRideComponent;
}());
exports.AcceptDeclineRideComponent = AcceptDeclineRideComponent;
