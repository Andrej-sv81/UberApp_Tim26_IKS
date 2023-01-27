"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Interceptor = void 0;
var core_1 = require("@angular/core");
var Interceptor = /** @class */ (function () {
    function Interceptor() {
    }
    Interceptor.prototype.intercept = function (req, next) {
        var accessToken = localStorage.getItem('user');
        var decodedItem = JSON.parse(accessToken);
        if (req.headers.get('skip'))
            return next.handle(req);
        if (accessToken) {
            var cloned = req.clone({
                headers: req.headers.set('X-Auth-Token', decodedItem.token)
            });
            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    };
    Interceptor = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], Interceptor);
    return Interceptor;
}());
exports.Interceptor = Interceptor;
