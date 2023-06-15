"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.MapComponent = void 0;
var core_1 = require("@angular/core");
var L = require("leaflet");
require("leaflet-routing-machine");
var stomp = require("@stomp/stompjs");
var SockJS = require("sockjs-client");
var car_icon_1 = require("./car-icon");
var MapComponent = /** @class */ (function () {
    function MapComponent(mapService, unregService, token, request, router) {
        this.mapService = mapService;
        this.unregService = unregService;
        this.token = token;
        this.request = request;
        this.router = router;
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
        this.role = '';
        this.id = 0;
        //simulation___________________________________
        this.vehicles = {};
        this.rides = {};
        this.mainGroup = [];
        this.rideEnded = false;
        //__________________________________________________
        this.data = new core_1.EventEmitter();
        this.rideAccepted = false;
        this.waitingForRide = false;
        this.acceptNotification = false;
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
        this.id = this.token.getUser().id;
        this.role = this.token.getUser().role;
        //simulation_______________________________________________
        this.initializeSocketSimulationConnection();
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
        var _this = this;
        var DefaultIcon = L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png'
        });
        L.Marker.prototype.options.icon = DefaultIcon;
        this.initMap();
        this.rideService.rideEndedValue$.subscribe(function (value) {
            _this.rideEnded = value;
        });
        this.rideService.isRideStarted$.subscribe(function (value) {
            if (value === true) {
                if (_this.currentRoute != null) {
                    _this.map.removeControl(_this.currentRoute);
                }
                var route = L.Routing.control({
                    waypoints: [L.latLng(_this.acceptRide.locations[0].departure.latitude, _this.acceptRide.locations[0].departure.longitude),
                        L.latLng(_this.acceptRide.locations[0].destination.latitude, _this.acceptRide.locations[0].destination.longitude)],
                    show: false,
                    routeWhileDragging: true
                }).addTo(_this.map);
                _this.currentRoute = route;
            }
        });
        this.rideService.rideStatusChangedValue$.subscribe(function (value) {
            _this.rideDeclined = value;
        });
        this.rideService.rideAcceptedValue$.subscribe(function (value) {
            _this.rideAccepted = value;
        });
        this.rideService.activeRideValue$.subscribe(function (value) {
            _this.rideAccepted = value;
            if (_this.currentRoute != null) {
                _this.map.removeControl(_this.currentRoute);
            }
            if (_this.rideAccepted == true) {
                if (_this.currentRoute != null) {
                    _this.map.removeControl(_this.currentRoute);
                }
                var route = L.Routing.control({
                    waypoints: [L.latLng(_this.acceptRide.locations[0].departure.latitude, _this.acceptRide.locations[0].departure.longitude),
                        L.latLng(_this.acceptRide.locations[0].destination.latitude, _this.acceptRide.locations[0].destination.longitude)],
                    show: false,
                    routeWhileDragging: true
                }).addTo(_this.map);
                _this.currentRoute = route;
            }
        });
    };
    MapComponent.prototype.createRide = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fromResult, toResult, fromRide, toRide, passenger, req, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.mapService.search(this.from).toPromise()];
                    case 1:
                        fromResult = _b.sent();
                        return [4 /*yield*/, this.mapService.search(this.to).toPromise()];
                    case 2:
                        toResult = _b.sent();
                        if (fromResult.length === 0 || toResult.length === 0) {
                            // Handle the case where the search results are empty
                            return [2 /*return*/];
                        }
                        this.latDeparture = fromResult[0].lat;
                        this.lonDeparture = fromResult[0].lon;
                        this.latDestination = toResult[0].lat;
                        this.lonDestination = toResult[0].lon;
                        fromRide = {
                            address: this.from,
                            latitude: this.latDeparture,
                            longitude: this.lonDeparture
                        };
                        toRide = {
                            address: this.from,
                            latitude: this.latDestination,
                            longitude: this.lonDestination
                        };
                        passenger = {
                            id: this.token.getUser().id,
                            email: this.token.getUser().email
                        };
                        req = {
                            locations: [{ departure: fromRide, destination: toRide }],
                            passengers: [passenger],
                            vehicleType: this.vehicle,
                            babyTransport: this.baby,
                            petTransport: this.pet,
                            scheduledTime: ""
                        };
                        this.request.createRide(req).subscribe({
                            next: function (result) {
                            },
                            error: function (error) {
                            }
                        });
                        this.route(parseFloat(this.latDeparture), parseFloat(this.lonDeparture), parseFloat(this.latDestination), parseFloat(this.lonDestination));
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //simulation_______________________________________________________
    MapComponent.prototype.initializeSocketSimulationConnection = function () {
        var ws = new SockJS('http://localhost:8080/simulation');
        this.stompSimulation = stomp.Stomp.over(ws);
        this.stompSimulation.debug = null;
        var that = this;
        this.stompSimulation.connect({}, function () {
            that.openSimulationSocket();
        });
    };
    MapComponent.prototype.openSimulationSocket = function () {
        var _this = this;
        this.stompSimulation.subscribe('/map-updates', function (message) {
            var newLocation = JSON.parse(message.body);
            var vehicle = _this.vehicles[newLocation.id];
            vehicle.setIcon(car_icon_1.carMarker);
            vehicle.setLatLng([newLocation.longitude, newLocation.latitude]);
            if (_this.role === 'DRIVER') {
                _this.setDriverSockets();
            }
            else if (_this.role === 'PASSENGER') {
                _this.setPassengerSockets();
            }
        });
    };
    MapComponent.prototype.setPassengerSockets = function () {
        var _this = this;
        this.stompClient.subscribe('/passenger/ride/' + this.id, function (message) {
            console.log(message);
            if (message.body === "You have a scheduled ride!") {
                alert("You have a scheduled ride!");
            }
            else if (message.body === "No suitable driver found!") {
                alert("No suitable driver found!");
            }
            else {
                _this.acceptRide = JSON.parse(message.body);
                if (_this.acceptRide.status === "ACCEPTED") {
                    _this.rideService.setPanicPressed(null);
                    _this.rideService.setRideEnded(false);
                    _this.rideAccepted = true;
                    _this.acceptRide.estimatedTimeInMinutes = Math.round(_this.acceptRide.estimatedTimeInMinutes * 100) / 100;
                    _this.waitingForRide = false;
                    _this.rideService.setActiveRide(true);
                    _this.mapService.simulateRide(_this.acceptRide.id).subscribe({
                        next: function (result) {
                        },
                        error: function (error) {
                        }
                    });
                }
                else if (_this.acceptRide.status === "REJECTED" || _this.acceptRide.status == "CANCELED") {
                    alert('Your ride was rejected');
                    _this.rideService.setPanicPressed(null);
                    _this.clearMap();
                    _this.rideAssumption.estimatedCost = 0;
                    _this.rideAssumption.estimatedTimeInMinutes = 0;
                    _this.waitingForRide = false;
                    _this.rideAccepted = false;
                }
            }
        });
        this.stompClient.subscribe('/passenger/start-ride/' + this.id, function (message) {
            var ride = JSON.parse(message.body);
            _this.rideService.setRideStarted(true);
            _this.rideService.setRideEnded(false);
            _this.rideService.setPanicPressed(null);
            _this.mapService.simulateRide(ride.id).subscribe({
                next: function (result) {
                    console.log(result);
                },
                error: function (error) {
                    console.log(error);
                }
            });
            console.log(message);
        });
        this.stompClient.subscribe('/passenger/end-ride/' + this.id, function (message) {
            var ride = JSON.parse(message.body);
            console.log(message.body);
            _this.rideService.setRideEnded(true);
            _this.mapService.get(ride.driver.id).subscribe({
                next: function (result) {
                    _this.vehicles[result.id].setIcon(car_icon_1.carMarker);
                    _this.rideService.setActiveRide(false);
                    _this.rideService.setRideAccepted(false);
                    _this.rideService.setRideStarted(false);
                    _this.router.navigate(['/profile/review:' + ride.id]);
                },
                error: function (error) {
                    console.log(error);
                }
            });
        });
    };
    MapComponent.prototype.clearMap = function () {
    };
    MapComponent.prototype.setDriverSockets = function () {
        var _this = this;
        this.stompClient.subscribe('/driver/ride/' + this.id, function (message) {
            console.log(message);
            _this.rideService.setRideEnded(false);
            _this.rideService.setPanicPressed(null);
            _this.rideService.setRideStatus(false);
            _this.acceptRide = JSON.parse(message.body);
            _this.acceptRide.estimatedTimeInMinutes = Math.round(_this.acceptRide.estimatedTimeInMinutes * 100) / 100;
            _this.acceptNotification = true;
            _this.router.navigate(['/accept-decline-ride']);
        });
        this.stompClient.subscribe('/driver/start-ride/' + this.id, function (message) {
            var ride = JSON.parse(message.body);
            _this.rideService.setRideEnded(false);
            _this.rideService.setPanicPressed(null);
            _this.rideService.setRideStarted(true);
            _this.mapService.simulateRide(ride.id).subscribe({
                next: function (result) {
                    console.log(result);
                },
                error: function (error) {
                    console.log(error);
                }
            });
            console.log(message);
        });
        this.stompClient.subscribe('/driver/end-ride/' + this.id, function (message) {
            var ride = JSON.parse(message.body);
            _this.rideService.setRideEnded(true);
            _this.mapService.get(ride.driver.id).subscribe({
                next: function (result) {
                    _this.vehicles[result.id].setIcon(car_icon_1.carMarker);
                    _this.rideAccepted = false;
                    _this.rideService.setActiveRide(false);
                    _this.router.navigate(['/driver-home']);
                },
                error: function (error) {
                    console.log(error);
                }
            });
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
    __decorate([
        core_1.Input()
    ], MapComponent.prototype, "acceptRide");
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
