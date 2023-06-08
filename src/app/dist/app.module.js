"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var toolbar_component_1 = require("./components/toolbar/toolbar.component");
var home_component_1 = require("./components/home/home.component");
var safety_component_1 = require("./components/safety/safety.component");
var help_component_1 = require("./components/help/help.component");
var request_ride_component_1 = require("./components/request-ride/request-ride.component");
var map_module_1 = require("./components/map/map.module");
var common_1 = require("@angular/common");
var http_1 = require("@angular/common/http");
var interceptor_service_1 = require("./modules/auth/interceptor/interceptor.service");
var http_2 = require("@angular/common/http");
var registration_module_1 = require("./modules/registration/registration.module");
var auth_module_1 = require("./modules/auth/auth.module");
var activation_module_1 = require("./modules/account-activation/activation.module");
var profile_module_1 = require("./modules/user-profile/profile/profile.module");
var accept_decline_ride_component_1 = require("./modules/accept-decline-ride/accept-decline-ride.component");
var animations_1 = require("@angular/platform-browser/animations");
var current_ride_driver_component_1 = require("./modules/current-ride-driver/current-ride-driver.component");
var current_ride_passenger_component_1 = require("./modules/current-ride-passenger/current-ride-passenger.component");
var unregistered_component_1 = require("./modules/unregistered/unregistered.component");
var driver_home_component_1 = require("./modules/driver-home/driver-home.component");
var button_toggle_1 = require("@angular/material/button-toggle");
var slide_toggle_1 = require("@angular/material/slide-toggle");
var forms_1 = require("@angular/forms");
var password_reset_component_1 = require("./modules/password-reset/password-reset.component");
var form_field_1 = require("@angular/material/form-field");
var card_1 = require("@angular/material/card");
var material_module_1 = require("./material/material/material.module");
//import { MapComponent } from './components/map/map.component';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                toolbar_component_1.ToolbarComponent,
                home_component_1.HomeComponent,
                safety_component_1.SafetyComponent,
                help_component_1.HelpComponent,
                request_ride_component_1.RequestRideComponent,
                accept_decline_ride_component_1.AcceptDeclineRideComponent,
                current_ride_driver_component_1.CurrentRideDriverComponent,
                current_ride_passenger_component_1.CurrentRidePassengerComponent,
                unregistered_component_1.UnregisteredComponent,
                driver_home_component_1.DriverHomeComponent,
                password_reset_component_1.PasswordResetComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                map_module_1.MapModule,
                common_1.CommonModule,
                http_1.HttpClientModule,
                registration_module_1.RegistrationModule,
                auth_module_1.SecurityModule,
                activation_module_1.ActivationModule,
                profile_module_1.ProfileModule,
                animations_1.NoopAnimationsModule,
                button_toggle_1.MatButtonToggleModule,
                slide_toggle_1.MatSlideToggleModule,
                forms_1.FormsModule,
                card_1.MatCardModule,
                form_field_1.MatFormFieldModule,
                material_module_1.MaterialModule,
            ],
            providers: [{
                    provide: http_2.HTTP_INTERCEPTORS,
                    useClass: interceptor_service_1.Interceptor,
                    multi: true
                },],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
