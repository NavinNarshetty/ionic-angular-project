interface Coordinates {
    lat:string,
    lng:string
}


export interface PlaceData extends Coordinates {
    placeAddress:string,
    statisImageUrl:string
}