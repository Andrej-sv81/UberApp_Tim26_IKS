export interface RideRequest{
    
    locations:[
          {
            departure: {
              address: any;
              latitude: any;
              longitude: any;
            },
            destinatio: {
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
        scheduledTime: any;
}
