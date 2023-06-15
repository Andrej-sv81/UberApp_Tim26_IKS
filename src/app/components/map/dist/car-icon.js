"use strict";
exports.__esModule = true;
exports.carMarker = void 0;
var L = require("leaflet");
exports.carMarker = L.icon({
    iconUrl: '../../../assets/img/car.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [-3, -76]
});
