import { Injectable } from '@angular/core';
import { Booking } from './bookings.model';


@Injectable({
    providedIn:"root"
})
export class BookingService {
    private _bookings:Booking[]=[
        new Booking('b1','p1','u1',3 , 'New York'),
        new Booking('b1','p1','u1',3 , "France"),
        new Booking('b1','p1','u1',3, "Hong Kong"),
    ];

    get bookings(){
        return [...this._bookings]
    }
}