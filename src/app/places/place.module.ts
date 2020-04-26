import { PlaceData } from '../shared/picker/location-picker/location.module';

export class Place {
    constructor(
        public id:string ,
        public title:string ,
        public imageUrl:string ,
        public description:string ,
        public price:number,
        public avaliableFrom:Date,
        public avaliableTo:Date,
        public userId:string,
        public location:PlaceData) {
        
    }
}