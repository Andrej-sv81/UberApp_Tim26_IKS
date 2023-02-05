"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfileModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var profile_component_1 = require("./profile.component");
var forms_1 = require("@angular/forms");
var history_component_1 = require("./history/history.component");
var favorites_component_1 = require("./favorites/favorites.component");
var info_component_1 = require("./info/info.component");
var app_routing_module_1 = require("src/app/app-routing.module");
var update_component_1 = require("./update/update.component");
var change_password_component_1 = require("./change-password/change-password.component");
var material_module_1 = require("src/app/material/material/material.module");
var directives_module_1 = require("../directives/directives.module");
var sort_1 = require("@angular/material/sort");
var ProfileModule = /** @class */ (function () {
    function ProfileModule() {
    }
    ProfileModule = __decorate([
        core_1.NgModule({
            declarations: [
                profile_component_1.ProfileComponent,
                history_component_1.HistoryComponent,
                favorites_component_1.FavoritesComponent,
                info_component_1.InfoComponent,
                update_component_1.UpdateComponent,
                change_password_component_1.ChangePasswordComponent,
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                app_routing_module_1.AppRoutingModule,
                material_module_1.MaterialModule,
                directives_module_1.DirectivesModule,
                sort_1.MatSortModule
            ]
        })
    ], ProfileModule);
    return ProfileModule;
}());
exports.ProfileModule = ProfileModule;
