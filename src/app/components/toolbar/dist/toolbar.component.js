"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ToolbarComponent = void 0;
var core_1 = require("@angular/core");
var ToolbarComponent = /** @class */ (function () {
    function ToolbarComponent(auth, router, token) {
        this.auth = auth;
        this.router = router;
        this.token = token;
        this.logged = false;
        this.role = "";
    }
    ToolbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.auth.userState$.subscribe(function (result) {
            _this.logged = result;
        });
    };
    ToolbarComponent.prototype.homeRoute = function () {
        if (this.logged) {
            this.role = this.token.getUser().role;
            if (this.role === "ROLE_PASSENGER") {
                this.router.navigate(["/request-ride"]);
            }
            else if (this.role === "ROLE_DRIVER") {
                this.router.navigate(["/driver-home"]);
            }
        }
    };
    ToolbarComponent = __decorate([
        core_1.Component({
            selector: 'app-toolbar',
            templateUrl: './toolbar.component.html',
            styleUrls: ['./toolbar.component.css']
        })
    ], ToolbarComponent);
    return ToolbarComponent;
}());
exports.ToolbarComponent = ToolbarComponent;
