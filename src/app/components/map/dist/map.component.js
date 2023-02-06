"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MapComponent = void 0;
var core_1 = require("@angular/core");
var L = require("leaflet");
require("leaflet-routing-machine");
var MapComponent = /** @class */ (function () {
    function MapComponent(mapService, unregService, token, request) {
        this.mapService = mapService;
        this.unregService = unregService;
        this.token = token;
        this.request = request;
        this.clickedFrom = '';
        this.clickedTo = '';
        this.from = ''; // start location from form
        this.to = ''; //end location from form
        this.baby = false;
        this.pet = false;
        this.vehicle = 'STANDARD';
        this.latDeparture = '';
        this.lonDeparture = '';
        this.latDestination = '';
        this.lonDestination = '';
        this.price = 0;
        this.time = 0;
        this.data = new core_1.EventEmitter();
    }
    MapComponent.prototype.sendData = function () {
        this.data.emit({ fromMap: this.clickedFrom, toMap: this.clickedTo });
    };
    MapComponent.prototype.initMap = function () {
        this.map = L.map('map', {
            center: [45.2396, 19.8227],
            zoom: 14
        });
        var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            minZoom: 3,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });
        tiles.addTo(this.map);
        //this.search();
        // this.addMarker();
        // this.registerOnClick();
        //this.route();
    };
    MapComponent.prototype.search = function (street) {
        var _this = this;
        this.mapService.search(street).subscribe({
            next: function (result) {
                console.log(result);
                L.marker([result[0].lat, result[0].lon])
                    .addTo(_this.map)
                    .bindPopup('Pozdrav iz Strazilovske 19.')
                    .openPopup();
            },
            error: function () { }
        });
    };
    MapComponent.prototype.registerOnClick = function () {
        var _this = this;
        this.map.on('click', function (e) {
            var coord = e.latlng;
            var lat = coord.lat.float;
            var lng = coord.lng.float;
            _this.mapService.reverseSearch(parseFloat(lat), parseFloat(lng)).subscribe(function (res) {
                console.log(res.toString());
                // TODO PROVERI ZASTO NE RADI IZBACUJE DA OCEKUJE FLOAT SVAKI PUT
                // if (this.clickedFrom=''){
                //   this.clickedFrom = res.toString();
                //   const mp = new L.Marker([lat, lng]).addTo(this.map);
                // }else if (this.clickedTo=''){
                //   this.clickedTo = res.toString();
                //   const mp = new L.Marker([lat, lng]).addTo(this.map);
                // }else {
                //   console.log("Refresh page.");
                // }
                console.log("FROM PROBA:" + _this.clickedFrom);
                console.log("TO PROBA:" + _this.clickedTo);
            });
            console.log('You clicked the map at latitude: ' + lat + ' and longitude: ' + lng);
            // alert(mp.getLatLng());
        });
    };
    MapComponent.prototype.route = function (lat1, lon1, lat2, lon2) {
        L.Routing.control({
            waypoints: [L.latLng(lat1, lon1), L.latLng(lat2, lon2)]
        }).addTo(this.map);
    };
    MapComponent.prototype.estimateTimeAndCost = function () {
        var _this = this;
        this.mapService.search(this.from).subscribe({
            next: function (result) {
                _this.latDeparture = result[0].lat;
                _this.lonDeparture = result[0].lon;
            },
            error: function (error) {
                console.log(error);
            }
        });
        this.mapService.search(this.to).subscribe({
            next: function (result) {
                _this.latDestination = result[0].lat;
                _this.lonDestination = result[0].lon;
            },
            error: function (error) {
                console.log(error);
            }
        });
        var estim = {
            locations: [
                {
                    departure: {
                        address: this.from,
                        latitude: this.latDeparture,
                        longitude: this.lonDeparture
                    },
                    destination: {
                        address: this.to,
                        latitude: this.latDestination,
                        longitude: this.lonDestination
                    }
                }
            ],
            vehicleType: 'STANDARD',
            babyTransport: true,
            petTransport: true
        };
        this.unregService.getEstimated(estim).subscribe({
            next: function (result) {
                _this.price = result.estimatedCost;
                _this.time = result.estimatedTimeInMinutes;
            }
        });
        this.route(parseFloat(this.latDeparture), parseFloat(this.lonDeparture), parseFloat(this.latDestination), parseFloat(this.lonDestination));
    };
    MapComponent.prototype.addMarker = function () {
        var lat = 45.25;
        var lon = 19.8228;
        // L.marker([lat, lon])
        //   .addTo(this.map)
        //   .bindPopup('Trenutno se nalazite ovde.')
        //   .openPopup();
    };
    MapComponent.prototype.ngAfterViewInit = function () {
        var DefaultIcon = L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png'
        });
        L.Marker.prototype.options.icon = DefaultIcon;
        this.initMap();
    };
    MapComponent.prototype.createRide = function () {
        var _this = this;
        this.mapService.search(this.from).subscribe({
            next: function (result) {
                _this.latDeparture = result[0].lat;
                _this.lonDeparture = result[0].lon;
            },
            error: function (error) {
                console.log(error);
            }
        });
        this.mapService.search(this.to).subscribe({
            next: function (result) {
                _this.latDestination = result[0].lat;
                _this.lonDestination = result[0].lon;
            },
            error: function (error) {
                console.log(error);
            }
        });
        var req = {
            locations: [
                {
                    departure: {
                        address: this.from,
                        latitude: this.latDeparture,
                        longitude: this.lonDeparture
                    },
                    destinatio: {
                        address: this.to,
                        latitude: this.latDestination,
                        longitude: this.lonDestination
                    }
                }
            ],
            passengers: [
                {
                    id: this.token.getUser().id,
                    email: this.token.getUser().email
                }
            ],
            vehicleType: this.vehicle,
            babyTransport: this.baby,
            petTransport: this.pet,
            scheduledTime: undefined
        };
        this.request.createRide(req).subscribe({
            next: function (result) {
            },
            error: function (error) {
            }
        });
        this.route(parseFloat(this.latDeparture), parseFloat(this.lonDeparture), parseFloat(this.latDestination), parseFloat(this.lonDestination));
    };
    __decorate([
        core_1.Input()
    ], MapComponent.prototype, "from");
    __decorate([
        core_1.Input()
    ], MapComponent.prototype, "to");
    __decorate([
        core_1.Input()
    ], MapComponent.prototype, "baby");
    __decorate([
        core_1.Input()
    ], MapComponent.prototype, "pet");
    __decorate([
        core_1.Input()
    ], MapComponent.prototype, "vehicle");
    __decorate([
        core_1.Output()
    ], MapComponent.prototype, "data");
    MapComponent = __decorate([
        core_1.Component({
            selector: 'app-map',
            templateUrl: './map.component.html',
            styleUrls: ['./map.component.css']
        })
    ], MapComponent);
    return MapComponent;
}());
exports.MapComponent = MapComponent;
