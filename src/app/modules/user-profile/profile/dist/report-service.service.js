"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ReportServiceService = void 0;
var core_1 = require("@angular/core");
var ReportServiceService = /** @class */ (function () {
    function ReportServiceService() {
    }
    ReportServiceService.prototype.ReturnMonthlyRides = function () {
        return [65, 59, 80, 81, 56, 55, 40, 23, 2, 100, 57, 87];
    };
    ReportServiceService.prototype.ReturnMonthlyEarnings = function () {
        return [456, 259, 180, 281, 356, 585, 450, 233, 211, 1020, 537, 87];
    };
    ReportServiceService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ReportServiceService);
    return ReportServiceService;
}());
exports.ReportServiceService = ReportServiceService;
