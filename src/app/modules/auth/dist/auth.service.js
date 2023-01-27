"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var environment_1 = require("src/app/environments/environment");
var AuthService = /** @class */ (function () {
    // user$ = new BehaviorSubject(null);
    // userState$ = this.user$.asObservable();
    function AuthService(http, tokenService) {
        this.http = http;
        this.tokenService = tokenService;
        this.headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            skip: 'true'
        });
        //this.user$.next(this.getRole());
    }
    AuthService.prototype.login = function (auth) {
        return this.http.post(environment_1.environment.apiHost + 'api/user/login', auth, {
            headers: this.headers
        });
    };
    // getRole(): any {
    //   if (this.isLoggedIn()) {
    //     const accessToken: any = localStorage.getItem('user');
    //     const helper = new JwtHelperService();
    //     const role = helper.decodeToken(accessToken).role[0].authority; //TODO  
    //     return role;
    //   }
    //   return null;
    // }
    AuthService.prototype.isLoggedIn = function () {
        if (this.tokenService.getUser() != null) {
            return true;
        }
        return false;
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
