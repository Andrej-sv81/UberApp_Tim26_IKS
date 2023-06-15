import * as L from 'leaflet';

export const carMarker = L.icon({
    iconUrl: '../../../assets/img/car.png',

    iconSize: [30, 30],
    iconAnchor: [ 15, 30],
    popupAnchor: [-3, -76]
});