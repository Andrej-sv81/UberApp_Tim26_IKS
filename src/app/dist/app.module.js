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
var login_component_1 = require("./components/login/login.component");
var toolbar_component_1 = require("./components/toolbar/toolbar.component");
var home_component_1 = require("./components/home/home.component");
var safety_component_1 = require("./components/safety/safety.component");
var help_component_1 = require("./components/help/help.component");
var registration_component_1 = require("./components/registration/registration.component");
var request_ride_component_1 = require("./components/request-ride/request-ride.component");
var map_module_1 = require("./components/map/map.module");
var common_1 = require("@angular/common");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
//import {HTTP_INTERCEPTORS} from "@angular/common/http"
//import { MapComponent } from './components/map/map.component';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                toolbar_component_1.ToolbarComponent,
                home_component_1.HomeComponent,
                safety_component_1.SafetyComponent,
                help_component_1.HelpComponent,
                registration_component_1.RegistrationComponent,
                request_ride_component_1.RequestRideComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                map_module_1.MapModule,
                common_1.CommonModule,
                http_1.HttpClientModule,
                forms_1.FormsModule
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
