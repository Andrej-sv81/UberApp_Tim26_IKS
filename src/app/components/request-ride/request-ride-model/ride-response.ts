export interface RideResponse{
    
        id: any;
        startTime: any;
        endTime: any;
        totalCost: any;
        driver: {
          id: any;
          email: any;
        },
        passengers: [
          {
            id: any;
            email: any;
          }
        ],
        estimatedTimeInMinutes: any;
        vehicleType: any;
        babyTransport: any;
        petTransport: any;
        rejection: {
          reason: any;
          timeOfRejection: any;
        },
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
        status: any;
        scheduledTime: any;
      
}