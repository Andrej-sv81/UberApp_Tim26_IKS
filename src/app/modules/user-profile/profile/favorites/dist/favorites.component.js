"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FavoritesComponent = void 0;
var core_1 = require("@angular/core");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var FavoritesComponent = /** @class */ (function () {
    function FavoritesComponent(profile, router) {
        this.profile = profile;
        this.router = router;
        this.displayedColumns = [
            'name',
            'departure',
            'destination',
            'vehicle_type',
            'baby',
            'pet',
            'call',
            'delete',
        ];
        this.rides = [];
        this.favorites = [];
        this.condition = true;
    }
    FavoritesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.profile.getFavorites().subscribe({
            next: function (result) {
                _this.rides = result;
                for (var _i = 0, _a = _this.rides; _i < _a.length; _i++) {
                    var ride = _a[_i];
                    var rideTemp = {
                        id: undefined,
                        name: undefined,
                        departure: undefined,
                        destination: undefined,
                        vehicle_type: undefined,
                        baby: undefined,
                        pet: undefined
                    };
                    rideTemp.id = ride.id;
                    rideTemp.name = ride.favoriteName;
                    rideTemp.departure = ride.locations[0].departure.address;
                    rideTemp.destination = ride.locations[0].destination.address;
                    rideTemp.vehicle_type = ride.vehicleType;
                    rideTemp.baby = ride.babyTransport;
                    rideTemp.pet = ride.petTransport;
                    _this.favorites.push(rideTemp);
                }
                _this.dataSource = new table_1.MatTableDataSource(_this.favorites);
                console.log(_this.favorites);
            },
            error: function (error) { }
        });
    };
    FavoritesComponent.prototype.ngAfterViewInit = function () {
        this.dataSource.sort = this.sort;
    };
    FavoritesComponent.prototype["delete"] = function (id) {
        var _this = this;
        this.profile.deleteFavorite(id).subscribe({
            next: function () {
                _this.favorites = [];
                _this.ngOnInit();
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    FavoritesComponent.prototype.call = function (id) {
    };
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], FavoritesComponent.prototype, "sort");
    FavoritesComponent = __decorate([
        core_1.Component({
            selector: 'app-favorites',
            templateUrl: './favorites.component.html',
            styleUrls: ['./favorites.component.css']
        })
    ], FavoritesComponent);
    return FavoritesComponent;
}());
exports.FavoritesComponent = FavoritesComponent;
