"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RequestRideService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var environment_1 = require("src/app/environments/environment");
var RequestRideService = /** @class */ (function () {
    function RequestRideService(http) {
        this.http = http;
        this.headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json'
        });
    }
    RequestRideService.prototype.createRide = function (body) {
        return this.http.post(environment_1.environment.apiHost + 'api/ride', body, {
            headers: this.headers
        });
    };
    RequestRideService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], RequestRideService);
    return RequestRideService;
}());
exports.RequestRideService = RequestRideService;
