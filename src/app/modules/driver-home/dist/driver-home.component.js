"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DriverHomeComponent = void 0;
var core_1 = require("@angular/core");
var stompjs_1 = require("@stomp/stompjs");
var sockJS = require("sockjs-client");
var environment_1 = require("../../environments/environment");
var DriverHomeComponent = /** @class */ (function () {
    function DriverHomeComponent(router, service) {
        this.router = router;
        this.service = service;
        this.isLoaded = false;
        this.driverId = 2;
    }
    DriverHomeComponent.prototype.ngOnInit = function () {
        this.createWebSocket();
    };
    DriverHomeComponent.prototype.handleToggle = function (event) {
        var value = event.checked;
        console.log(value);
        this.service.changeState(value).subscribe(function (result) {
            console.log(result);
        });
    };
    DriverHomeComponent.prototype.createWebSocket = function () {
        var that = this;
        this.stompClient = stompjs_1.Stomp.over(function () { return new sockJS(environment_1.environment.apiHost + "socket"); });
        this.stompClient.connect({}, function () {
            that.isLoaded = true;
            that.connectToSocket();
        });
    };
    DriverHomeComponent.prototype.connectToSocket = function () {
        if (this.isLoaded) {
            this.stompClient.subscribe("/rideOut/" + this.driverId, function (response) {
                console.log(JSON.parse(response.body));
                // this.router.navigateByUrl("/accept-decline-ride")
            });
        }
    };
    DriverHomeComponent = __decorate([
        core_1.Component({
            selector: 'app-driver-home',
            templateUrl: './driver-home.component.html',
            styleUrls: ['./driver-home.component.css']
        })
    ], DriverHomeComponent);
    return DriverHomeComponent;
}());
exports.DriverHomeComponent = DriverHomeComponent;
