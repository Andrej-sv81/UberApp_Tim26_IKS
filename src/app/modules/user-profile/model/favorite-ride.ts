export interface FavoriteRide{
        id: any;
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

        passengers: [
          {
            id: any;
            email: any;
          }
        ],
        
        vehicleType: any;
        babyTransport: any;
        petTransport: any;
      
}