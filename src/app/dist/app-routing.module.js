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
var registration_component_1 = require("./modules/registration/register/registration.component");
var safety_component_1 = require("./components/safety/safety.component");
var request_ride_component_1 = require("./components/request-ride/request-ride.component");
var login_guard_1 = require("./modules/auth/guard/login.guard");
var activation_component_1 = require("./modules/account-activation/activation/activation.component");
var profile_component_1 = require("./modules/user-profile/profile/profile.component");
var info_component_1 = require("./modules/user-profile/profile/info/info.component");
var history_component_1 = require("./modules/user-profile/profile/history/history.component");
var favorites_component_1 = require("./modules/user-profile/profile/favorites/favorites.component");
var update_component_1 = require("./modules/user-profile/profile/update/update.component");
var change_password_component_1 = require("./modules/user-profile/profile/change-password/change-password.component");
var accept_decline_ride_component_1 = require("./modules/accept-decline-ride/accept-decline-ride.component");
var current_ride_passenger_component_1 = require("./modules/current-ride-passenger/current-ride-passenger.component");
var current_ride_driver_component_1 = require("./modules/current-ride-driver/current-ride-driver.component");
var unregistered_component_1 = require("./modules/unregistered/unregistered.component");
var driver_home_component_1 = require("./modules/driver-home/driver-home.component");
var password_reset_component_1 = require("./modules/password-reset/password-reset.component");
var routes = [
    { path: '', redirectTo: "unregistered", pathMatch: 'full' },
    { path: 'unregistered', component: unregistered_component_1.UnregisteredComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'reset', component: password_reset_component_1.PasswordResetComponent },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'driver-home', component: driver_home_component_1.DriverHomeComponent },
    { path: 'help', component: help_component_1.HelpComponent },
    { path: 'safety', component: safety_component_1.SafetyComponent },
    { path: 'registration', component: registration_component_1.RegistrationComponent },
    { path: 'request-ride', component: request_ride_component_1.RequestRideComponent },
    { path: 'activate', component: activation_component_1.ActivationComponent },
    { path: 'accept-decline-ride', component: accept_decline_ride_component_1.AcceptDeclineRideComponent },
    { path: 'current-ride-passenger', component: current_ride_passenger_component_1.CurrentRidePassengerComponent },
    { path: 'current-ride-driver', component: current_ride_driver_component_1.CurrentRideDriverComponent },
    { path: 'profile', component: profile_component_1.ProfileComponent, canActivate: [login_guard_1.LoginGuard], children: [
            { path: 'info', component: info_component_1.InfoComponent },
            { path: 'history', component: history_component_1.HistoryComponent },
            { path: 'favorites', component: favorites_component_1.FavoritesComponent },
            { path: 'update', component: update_component_1.UpdateComponent },
            { path: 'change-password', component: change_password_component_1.ChangePasswordComponent },
            { path: '', redirectTo: 'info', pathMatch: 'full' },
            { path: '**', component: info_component_1.InfoComponent },
        ] },
    { path: '**', component: unregistered_component_1.UnregisteredComponent },
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
