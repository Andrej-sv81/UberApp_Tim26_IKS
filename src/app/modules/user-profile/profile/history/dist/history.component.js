"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HistoryComponent = void 0;
var core_1 = require("@angular/core");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var HistoryComponent = /** @class */ (function () {
    function HistoryComponent(profile, router) {
        this.profile = profile;
        this.router = router;
        this.displayedColumns = [
            'departure',
            'destination',
            'cost',
            'time',
            'details'
        ];
        this.ridesResult = [];
        this.ridesTable = [];
        this.condition = true;
        this.passengers = [];
    }
    Object.defineProperty(HistoryComponent.prototype, "matSort", {
        set: function (sort) {
            this.dataSource.sort = sort;
        },
        enumerable: false,
        configurable: true
    });
    HistoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.profile.getRides().subscribe({
            next: function (result) {
                _this.ridesResult = result.results;
                for (var _i = 0, _a = _this.ridesResult; _i < _a.length; _i++) {
                    var ride = _a[_i];
                    var rideTemp = {
                        id: undefined,
                        departure: undefined,
                        destination: undefined,
                        cost: undefined,
                        time: undefined
                    };
                    rideTemp.id = ride.id;
                    rideTemp.departure = ride.locations[0].departure.address;
                    rideTemp.destination = ride.locations[0].destination.address;
                    rideTemp.cost = ride.totalCost;
                    rideTemp.time = ride.estimatedTimeInMinutes;
                    _this.ridesTable.push(rideTemp);
                }
                _this.dataSource = new table_1.MatTableDataSource(_this.ridesTable);
                _this.dataSource.paginator = _this.paginator;
            },
            error: function (error) { }
        });
    };
    HistoryComponent.prototype.ngAfterViewInit = function () {
    };
    HistoryComponent.prototype.details = function (id) {
        for (var _i = 0, _a = this.ridesResult; _i < _a.length; _i++) {
            var ride = _a[_i];
            if (ride.id === id) {
                this.departure = ride.locations[0].departure.address;
                this.destination = ride.locations[0].destination.address;
                this.stime = ride.startTime;
                this.etime = ride.endTime;
                this.cost = ride.totalCost;
                this.time = ride.estimatedTimeInMinutes;
                this.pet = ride.petTransport;
                this.baby = ride.babyTransport;
                this.driver = ride.driver.email;
                this.rejection = ride.rejection.reason;
                for (var _b = 0, _c = ride.passengers; _b < _c.length; _b++) {
                    var passenger = _c[_b];
                    this.passengers.push(passenger.email);
                }
                break;
            }
        }
        this.condition = !this.condition;
    };
    HistoryComponent.prototype.back = function () {
        this.condition = !this.condition;
    };
    __decorate([
        core_1.ViewChild('paginator')
    ], HistoryComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], HistoryComponent.prototype, "matSort");
    HistoryComponent = __decorate([
        core_1.Component({
            selector: 'app-history',
            templateUrl: './history.component.html',
            styleUrls: ['./history.component.css']
        })
    ], HistoryComponent);
    return HistoryComponent;
}());
exports.HistoryComponent = HistoryComponent;
