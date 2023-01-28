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
var rxjs_1 = require("rxjs");
var Interceptor = /** @class */ (function () {
    function Interceptor(tokenService, router) {
        this.tokenService = tokenService;
        this.router = router;
    }
    Interceptor.prototype.intercept = function (req, next) {
        var _this = this;
        if (req.headers.get('skip'))
            return next.handle(req);
        var accessToken = this.tokenService.getToken();
        var refreshToken = this.tokenService.getRefreshToken();
        if (accessToken) {
            var cloned = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + accessToken)
            });
            return next.handle(cloned).pipe(rxjs_1.catchError(function (error) {
                if (error.status === 401) {
                    if (refreshToken) {
                        var refreshCloned = req.clone({
                            headers: req.headers.set('Authorization', 'Bearer ' + refreshToken)
                        });
                        return next.handle(refreshCloned).pipe(rxjs_1.catchError(function (error2) {
                            if (error2.status === 401) {
                                _this.tokenService.signOut();
                                _this.router.navigate(['login']);
                            }
                            return rxjs_1.throwError(error);
                        }));
                    }
                }
                return rxjs_1.throwError(error);
            }));
        }
        else {
            this.tokenService.signOut();
            this.router.navigate(['login']);
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
