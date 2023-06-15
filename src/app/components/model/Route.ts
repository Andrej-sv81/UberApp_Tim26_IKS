export interface Route {
    id?:number;
    departure:Location;
    destination:Location;
  }

  export interface Location{
    id?:number;
    address:string;
    latitude:number;
    longitude:number;
}