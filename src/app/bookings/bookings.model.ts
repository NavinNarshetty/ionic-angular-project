export class Booking {
    constructor(public id:string ,
        public placeId:string ,
        public userId:string ,
        public  noofGuest:number ,
        public title:string,
        public firstname:string,
        public lastname:string,
        public fromdate:Date,
        public todate:Date){

    }
}