"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UnregisteredService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var environment_1 = require("src/app/environments/environment");
var UnregisteredService = /** @class */ (function () {
    function UnregisteredService(http) {
        this.http = http;
        this.headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            skip: 'true'
        });
    }
    UnregisteredService.prototype.getEstimated = function (body) {
        return this.http.post(environment_1.environment.apiHost + 'api/unregisteredUser/', body, {
            headers: this.headers
        });
    };
    UnregisteredService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UnregisteredService);
    return UnregisteredService;
}());
exports.UnregisteredService = UnregisteredService;
