import { Passenger } from "./passenger";

export interface FavoriteRequestOne{
    favoriteName: any;

    locations: [
      {
        departure: {
          address: any;
          latitude: any;
          longitude: any;
        },
        destination: {
          address: any;
          latitude: any;
          longitude: any;
        }
      }
    ],

    passengers: Passenger[],
    
    vehicleType: any;
    babyTransport: any;
    petTransport: any;
}