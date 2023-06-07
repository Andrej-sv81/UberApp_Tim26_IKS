"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DriverService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var environment_1 = require("src/app/environments/environment");
var DriverService = /** @class */ (function () {
    function DriverService(http, token) {
        this.http = http;
        this.token = token;
        this.headers = new http_1.HttpHeaders({});
        this.headersJSON = new http_1.HttpHeaders({
            'Content-Type': 'application/json'
        });
    }
    DriverService.prototype.changeState = function (state) {
        return this.http.put(environment_1.environment.apiHost + 'api/driver/' + this.token.getUser().id + "/activity?status=" + state, {});
    };
    DriverService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], DriverService);
    return DriverService;
}());
exports.DriverService = DriverService;
