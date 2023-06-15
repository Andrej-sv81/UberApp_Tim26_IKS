"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.MapComponent = void 0;
var core_1 = require("@angular/core");
var L = require("leaflet");
require("leaflet-routing-machine");
var Stomp = require("stompjs");
var SockJS = require("sockjs-client");
var leaflet_1 = require("leaflet");
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
        //simulation___________________________________
        this.vehicles = {};
        this.rides = {};
        this.mainGroup = [];
        //__________________________________________________
        this.data = new core_1.EventEmitter();
    }
    MapComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.unregService.selectedRoute$.subscribe({
            next: function (value) {
                if (value[0] !== "" && value[1] !== "") { //moguc error kod praznih stringova na pocetnom ucitavanju unregistered strane
                    _this.estimateTimeAndCost(value[0], value[1]);
                }
            }
        });
        //simulation_______________________________________________
        this.initializeWebSocketConnection();
        //_______________________________________________________
    };
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
    MapComponent.prototype.estimateTimeAndCost = function (fromLoc, toLoc) {
        var _this = this;
        this.from = fromLoc;
        this.to = toLoc;
        console.log(this.from);
        console.log(this.to);
        this.mapService.search(this.from).subscribe({
            next: function (result) {
                _this.latDeparture = result[0].lat;
                _this.lonDeparture = result[0].lon;
                console.log(_this.latDeparture, _this.lonDeparture);
                _this.mapService.search(_this.to).subscribe({
                    next: function (result) {
                        _this.latDestination = result[0].lat;
                        _this.lonDestination = result[0].lon;
                        console.log(_this.latDestination, _this.lonDestination);
                        var from = {
                            address: _this.from,
                            latitude: _this.latDeparture,
                            longitude: _this.latDeparture
                        };
                        var to = {
                            address: _this.to,
                            latitude: _this.latDestination,
                            longitude: _this.lonDestination
                        };
                        var ride = {
                            departure: from,
                            destination: to
                        };
                        var estim = {
                            locations: [],
                            vehicleType: 'STANDARD',
                            babyTransport: true,
                            petTransport: true
                        };
                        estim.locations.push(ride);
                        _this.unregService.getEstimated(estim).subscribe({
                            next: function (result) {
                                _this.price = result.estimatedCost;
                                _this.time = result.estimatedTimeInMinutes;
                            }
                        });
                        _this.route(parseFloat(_this.latDeparture), parseFloat(_this.lonDeparture), parseFloat(_this.latDestination), parseFloat(_this.lonDestination));
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    MapComponent.prototype.addMarker = function () {
        var lat = 45.25;
        var lon = 19.8228;
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
        var fromRide = {
            address: this.from,
            latitude: this.latDeparture,
            longitude: this.latDeparture
        };
        var toRide = {
            address: this.from,
            latitude: this.latDestination,
            longitude: this.lonDestination
        };
        var passenger = {
            id: this.token.getUser().id,
            email: this.token.getUser().email
        };
        var req = {
            locations: [],
            passengers: [],
            vehicleType: this.vehicle,
            babyTransport: this.baby,
            petTransport: this.pet,
            scheduledTime: undefined
        };
        req.locations.push(fromRide);
        req.locations.push(toRide);
        req.passengers.push(passenger);
        this.request.createRide(req).subscribe({
            next: function (result) {
            },
            error: function (error) {
            }
        });
        this.route(parseFloat(this.latDeparture), parseFloat(this.lonDeparture), parseFloat(this.latDestination), parseFloat(this.lonDestination));
    };
    //simulation_______________________________________________________
    MapComponent.prototype.initializeWebSocketConnection = function () {
        var ws = new SockJS('http://localhost:8080/socket');
        this.stompClient = Stomp.over(ws);
        this.stompClient.debug = null;
        var that = this;
        this.stompClient.connect({}, function () {
            that.openGlobalSocket();
        });
    };
    MapComponent.prototype.openGlobalSocket = function () {
        var _this = this;
        this.stompClient.subscribe('/map-updates/update-vehicle-position', function (message) {
            var vehicle = JSON.parse(message.body);
            var existingVehicle = _this.vehicles[vehicle.id];
            existingVehicle.setLatLng([vehicle.longitude, vehicle.latitude]);
            existingVehicle.update();
        });
        this.stompClient.subscribe('/map-updates/new-ride', function (message) {
            var ride = JSON.parse(message.body);
            var geoLayerRouteGroup = new leaflet_1.LayerGroup();
            var color = Math.floor(Math.random() * 16777215).toString(16);
            for (var _i = 0, _a = JSON.parse(ride.routeJSON)['routes'][0]['legs'][0]['steps']; _i < _a.length; _i++) {
                var step = _a[_i];
                var routeLayer = leaflet_1.geoJSON(step.geometry);
                routeLayer.setStyle({ color: "#" + color });
                routeLayer.addTo(geoLayerRouteGroup);
                _this.rides[ride.id] = geoLayerRouteGroup;
            }
            var markerLayer = leaflet_1.marker([ride.vehicle.longitude, ride.vehicle.latitude], {
                icon: leaflet_1.icon({
                    iconUrl: 'assets/car.png',
                    iconSize: [35, 45],
                    iconAnchor: [18, 45]
                })
            });
            markerLayer.addTo(geoLayerRouteGroup);
            _this.vehicles[ride.vehicle.id] = markerLayer;
            _this.mainGroup = __spreadArrays(_this.mainGroup, [geoLayerRouteGroup]);
        });
        this.stompClient.subscribe('/map-updates/ended-ride', function (message) {
            var ride = JSON.parse(message.body);
            _this.mainGroup = _this.mainGroup.filter(function (lg) { return lg !== _this.rides[ride.id]; });
            delete _this.vehicles[ride.vehicle.id];
            delete _this.rides[ride.id];
        });
        this.stompClient.subscribe('/map-updates/delete-all-rides', function (message) {
            _this.vehicles = {};
            _this.rides = {};
            _this.mainGroup = [];
        });
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
