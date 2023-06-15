"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MapService = void 0;
var core_1 = require("@angular/core");
var MapService = /** @class */ (function () {
    function MapService(http) {
        this.http = http;
    }
    //constructor() {}
    MapService.prototype.search = function (street) {
        return this.http.get('https://nominatim.openstreetmap.org/search?format=json&q=' + street);
    };
    MapService.prototype.reverseSearch = function (lat, lon) {
        return this.http.get('https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&<params>');
    };
    MapService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], MapService);
    return MapService;
}());
exports.MapService = MapService;
