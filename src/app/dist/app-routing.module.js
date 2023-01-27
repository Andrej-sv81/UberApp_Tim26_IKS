"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var help_component_1 = require("./components/help/help.component");
var home_component_1 = require("./components/home/home.component");
var login_component_1 = require("./modules/auth/login/login.component");
var registration_component_1 = require("./modules/registration/registration.component");
var safety_component_1 = require("./components/safety/safety.component");
var request_ride_component_1 = require("./components/request-ride/request-ride.component");
var login_guard_1 = require("./modules/auth/guard/login.guard");
var routes = [
    { path: '', redirectTo: "login", pathMatch: 'full' },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'home', component: home_component_1.HomeComponent, canActivate: [login_guard_1.LoginGuard] },
    { path: 'help', component: help_component_1.HelpComponent, canActivate: [login_guard_1.LoginGuard] },
    { path: 'safety', component: safety_component_1.SafetyComponent, canActivate: [login_guard_1.LoginGuard] },
    { path: 'registration', component: registration_component_1.RegistrationComponent, canActivate: [login_guard_1.LoginGuard] },
    { path: 'requestride', component: request_ride_component_1.RequestRideComponent, canActivate: [login_guard_1.LoginGuard] },
    { path: '**', component: login_component_1.LoginComponent }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
