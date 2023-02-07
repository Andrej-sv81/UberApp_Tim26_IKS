"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfileService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var environment_1 = require("src/app/environments/environment");
var ProfileService = /** @class */ (function () {
    function ProfileService(http, token) {
        this.http = http;
        this.token = token;
        this.headers = new http_1.HttpHeaders({});
        this.headersJSON = new http_1.HttpHeaders({
            'Content-Type': 'application/json'
        });
    }
    ProfileService.prototype.loadPassenger = function () {
        return this.http.get(environment_1.environment.apiHost + 'api/passenger/' + this.token.getUser().id, {
            headers: this.headers
        });
    };
    ProfileService.prototype.updatePassenger = function (body) {
        return this.http.put(environment_1.environment.apiHost + 'api/passenger/' + this.token.getUser().id, body, {
            headers: this.headersJSON
        });
    };
    ProfileService.prototype.changePassword = function (body) {
        return this.http.put(environment_1.environment.apiHost + 'api/user/' + this.token.getUser().id + '/changePassword', body, {
            headers: this.headersJSON
        });
    };
    ProfileService.prototype.getFavorites = function () {
        return this.http.get(environment_1.environment.apiHost + 'api/ride/favorites', {
            headers: this.headersJSON
        });
    };
    ProfileService.prototype.deleteFavorite = function (id) {
        return this.http["delete"](environment_1.environment.apiHost + 'api/ride/favorites/' + id, {
            headers: this.headersJSON
        });
    };
    ProfileService.prototype.getRides = function () {
        return this.http.get(environment_1.environment.apiHost + 'api/user/' + this.token.getUser().id + '/ride', {
            headers: this.headersJSON
        });
    };
    ProfileService.prototype.addFavorite = function (body) {
        return this.http.post(environment_1.environment.apiHost + 'api/ride/favorites', body, {
            headers: this.headersJSON
        });
    };
    ProfileService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ProfileService);
    return ProfileService;
}());
exports.ProfileService = ProfileService;
