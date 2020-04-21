import { Injectable } from '@angular/core';
import { Booking } from './bookings.model';
import { BehaviorSubject } from 'rxjs';
import { delay, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';


@Injectable({
    providedIn:"root"
})
export class BookingService {
    private _bookings = new BehaviorSubject<Booking[]>([]);

    constructor(private _authservice:AuthService){}

    get bookings(){
        return this._bookings.asObservable();
    }

    addBooking(placeId:string,noofguest:number,title:string,firstname:string,lastname:string,fromdate:Date,todate:Date){
        const newBooking = new Booking(Math.random().toString(),placeId,this._authservice.userId,noofguest,title,firstname,lastname,fromdate,todate);
        return this.bookings.pipe(take(1),delay(1000),tap((bookings)=>{
            this._bookings.next(bookings.concat(newBooking));
        }))
    }

    cancelBooking(bookingId:string){
        return this.bookings.pipe(take(1),delay(1000),tap((bookings)=>{
            this._bookings.next(bookings.filter(b => {
                return b.id !== bookingId
            }))
        }))
    }
}