"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TokenService = void 0;
var core_1 = require("@angular/core");
var TOKEN_KEY = 'auth-token';
var REFRESHTOKEN_KEY = 'auth-refreshtoken';
var USER_KEY = 'auth-user';
var TokenService = /** @class */ (function () {
    function TokenService() {
    }
    TokenService.prototype.signOut = function () {
        window.sessionStorage.clear();
    };
    TokenService.prototype.saveToken = function (token) {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
        var user = this.getUser();
        if (user) {
            this.saveUser(__assign(__assign({}, user), { accessToken: token }));
        }
    };
    TokenService.prototype.getToken = function () {
        return window.sessionStorage.getItem(TOKEN_KEY);
    };
    TokenService.prototype.saveRefreshToken = function (token) {
        window.sessionStorage.removeItem(REFRESHTOKEN_KEY);
        window.sessionStorage.setItem(REFRESHTOKEN_KEY, token);
    };
    TokenService.prototype.getRefreshToken = function () {
        return window.sessionStorage.getItem(REFRESHTOKEN_KEY);
    };
    TokenService.prototype.saveUser = function (user) {
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    };
    TokenService.prototype.getUser = function () {
        var user = window.sessionStorage.getItem(USER_KEY);
        if (user) {
            return JSON.parse(user);
        }
        return null;
    };
    TokenService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], TokenService);
    return TokenService;
}());
exports.TokenService = TokenService;
