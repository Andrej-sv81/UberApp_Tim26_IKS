"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var forms_2 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, authService, tokenService) {
        this.router = router;
        this.authService = authService;
        this.tokenService = tokenService;
        this.loginForm = new forms_1.FormGroup({
            email: new forms_1.FormControl('', [forms_2.Validators.required]),
            password: new forms_1.FormControl('', [forms_2.Validators.required])
        });
        this.hasError = false;
    }
    LoginComponent.prototype.login = function () {
        var _this = this;
        var login = {
            email: this.loginForm.value.email,
            password: this.loginForm.value.password
        };
        if (this.loginForm.valid) {
            this.authService.login(login).subscribe({
                next: function (result) {
                    console.log(result);
                    _this.tokenService.saveUser(result);
                    _this.tokenService.saveToken(result.accessToken);
                    _this.tokenService.saveRefreshToken(result.refreshToken);
                    //this.authService.setUser();
                    _this.router.navigate(['home']);
                },
                error: function (error) {
                    if (error instanceof http_1.HttpErrorResponse) {
                        _this.hasError = true;
                    }
                }
            });
        }
        else {
            this.hasError = true;
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
