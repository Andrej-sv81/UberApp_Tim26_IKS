"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PasswordResetComponent = void 0;
var core_1 = require("@angular/core");
var PasswordResetComponent = /** @class */ (function () {
    function PasswordResetComponent(service, router) {
        this.service = service;
        this.router = router;
        this.email = '';
        this.code = '';
        this.newPassword = '';
        this.change = false;
    }
    PasswordResetComponent.prototype.submitForm = function () {
        this.service.resetEmailRequest(this.email);
        this.change = true;
    };
    PasswordResetComponent.prototype.resetPassword = function () {
        if (this.newPassword !== '' && this.code !== '') {
            var body = {
                newPassword: this.newPassword,
                code: this.code
            };
            this.service.resetPassword(this.email, body).subscribe(function (result) {
            });
        }
        this.router.navigate(['login']);
    };
    PasswordResetComponent = __decorate([
        core_1.Component({
            selector: 'app-password-reset',
            templateUrl: '../password-reset.component.html',
            styleUrls: ['../password-reset.component.css']
        })
    ], PasswordResetComponent);
    return PasswordResetComponent;
}());
exports.PasswordResetComponent = PasswordResetComponent;
