"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ChangePasswordComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var match_validator_1 = require("src/app/modules/passenger/registration/validator/match-validator");
var ChangePasswordComponent = /** @class */ (function () {
    function ChangePasswordComponent(profile, router) {
        this.profile = profile;
        this.router = router;
        this.passwordForm = new forms_1.FormGroup({
            oldPassword: new forms_1.FormControl('', [forms_1.Validators.required]),
            newPassword: new forms_1.FormControl('', [forms_1.Validators.required]),
            confirm: new forms_1.FormControl('', [forms_1.Validators.required])
        }, [match_validator_1.CustomValidators.MatchValidator('newPassword', 'confirm')]);
        this.hasError = false;
        this.messageForm = "New password not matching!";
        this.messageServer = "Incorect old password or invalid new password!";
        this.errorMessage = '';
    }
    ChangePasswordComponent.prototype.change = function () {
        var _this = this;
        if (this.passwordForm.valid) {
            var changePassword = {
                newPassword: this.passwordForm.value.newPassword,
                oldPassword: this.passwordForm.value.oldPassword
            };
            this.profile.changePassword(changePassword).subscribe({
                next: function () {
                    if (_this.hasError) {
                        _this.hasError = false;
                    }
                    _this.router.navigate(['profile/info']);
                },
                error: function (error) {
                    _this.errorMessage = _this.messageServer;
                    _this.hasError = true;
                }
            });
        }
        else {
            this.errorMessage = this.messageForm;
            this.hasError = true;
        }
    };
    ChangePasswordComponent = __decorate([
        core_1.Component({
            selector: 'app-change-password',
            templateUrl: '../change-password.component.html',
            styleUrls: ['../change-password.component.css']
        })
    ], ChangePasswordComponent);
    return ChangePasswordComponent;
}());
exports.ChangePasswordComponent = ChangePasswordComponent;
