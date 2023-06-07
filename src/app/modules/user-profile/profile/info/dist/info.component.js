"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InfoComponent = void 0;
var core_1 = require("@angular/core");
var InfoComponent = /** @class */ (function () {
    function InfoComponent(token, router, profile, auth) {
        this.token = token;
        this.router = router;
        this.profile = profile;
        this.auth = auth;
        this.name = '';
        this.surname = '';
        this.phone = '';
        this.email = '';
        this.address = '';
        this.imageData = '';
        this.hasError = false;
    }
    InfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.profile.loadUser().subscribe({
            next: function (result) {
                _this.name = result.name;
                _this.surname = result.surname;
                _this.phone = result.telephoneNumber;
                _this.email = result.email;
                _this.address = result.address;
                _this.imageData = result.profilePicture;
            },
            error: function (error) {
                _this.hasError = true;
            }
        });
    };
    InfoComponent.prototype.logut = function () {
        this.token.signOut();
        this.auth.user$.next(false);
        this.router.navigate(['login']);
    };
    InfoComponent.prototype.openDialog = function () {
        this.router.navigate(['profile/update']);
    };
    InfoComponent = __decorate([
        core_1.Component({
            selector: 'app-info',
            templateUrl: './info.component.html',
            styleUrls: ['./info.component.css']
        })
    ], InfoComponent);
    return InfoComponent;
}());
exports.InfoComponent = InfoComponent;
