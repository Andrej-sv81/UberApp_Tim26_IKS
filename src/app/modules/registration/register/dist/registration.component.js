"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegistrationComponent = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var match_validator_1 = require("../validator/match-validator");
var RegistrationComponent = /** @class */ (function () {
    function RegistrationComponent(router, regServ) {
        this.router = router;
        this.regServ = regServ;
        this.registrationForm = new forms_1.FormGroup({
            email: new forms_1.FormControl('', [forms_1.Validators.required]),
            password: new forms_1.FormControl('', [forms_1.Validators.required]),
            confirmPassword: new forms_1.FormControl('', [forms_1.Validators.required]),
            name: new forms_1.FormControl('', [forms_1.Validators.required]),
            surname: new forms_1.FormControl('', [forms_1.Validators.required]),
            phone: new forms_1.FormControl('', [forms_1.Validators.required]),
            address: new forms_1.FormControl('', [forms_1.Validators.required])
        }, [match_validator_1.CustomValidators.MatchValidator('password', 'confirmPassword')]);
        this.hasError = false;
    }
    RegistrationComponent.prototype.register = function () {
        var _this = this;
        if (this.registrationForm.valid) {
            var passenger = {
                name: this.registrationForm.value.name,
                surname: this.registrationForm.value.surname,
                profilePicture: '',
                telephoneNumber: this.registrationForm.value.phone,
                email: this.registrationForm.value.email,
                address: this.registrationForm.value.address,
                password: this.registrationForm.value.password
            };
            this.regServ.signUp(passenger).subscribe({
                next: function (result) {
                    _this.router.navigate(['activate']);
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
    RegistrationComponent = __decorate([
        core_1.Component({
            selector: 'app-registration',
            templateUrl: './registration.component.html',
            styleUrls: ['./registration.component.css']
        })
    ], RegistrationComponent);
    return RegistrationComponent;
}());
exports.RegistrationComponent = RegistrationComponent;
