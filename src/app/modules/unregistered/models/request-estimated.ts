export interface Estimated{
    locations:[
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
        vehicleType: "STANDARD",
        babyTransport: true,
        petTransport: true,
      
}