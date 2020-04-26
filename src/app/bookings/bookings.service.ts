import { Injectable } from '@angular/core';
import { Booking } from './bookings.model';
import { BehaviorSubject } from 'rxjs';
import { delay, take, tap, switchMap, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';

interface bookingData {
firstname: string
fromdate: Date
lastname: string
noofGuest: number
placeId: string
title: string
todate: Date
userId: string
}


@Injectable({
    providedIn:"root"
})
export class BookingService {
    private _bookings = new BehaviorSubject<Booking[]>([]);

    constructor(private _authservice:AuthService, private _http:HttpClient){}

    get bookings(){
        return this._bookings.asObservable();
    }

    addBooking(placeId:string,noofguest:number,title:string,firstname:string,lastname:string,fromdate:Date,todate:Date){
        const newBooking = new Booking(Math.random().toString(),placeId,this._authservice.userId,noofguest,title,firstname,lastname,fromdate,todate);
        let generatedId=""
        return this._http.post<{name:string}>('https://angular-ionic-915f6.firebaseio.com//booking.json',
        {
            ...newBooking,id:null
        }).pipe(switchMap((resultData)=>{
            generatedId = resultData.name;
            return this.bookings;
        }),
        take(1),
        tap((bookings)=>{
            newBooking.id = generatedId;
        this._bookings.next(bookings.concat(newBooking));
        }))
    }

    fetchBooking(){
        return this._http.get<{[key:string]:bookingData}>(`https://angular-ionic-915f6.firebaseio.com//booking.json?orderBy="userId"&equalTo="${this._authservice.userId}"`).pipe(map((bookingdata)=>{
            let bookings=[];
            for(let key in bookingdata ){
                if(bookingdata.hasOwnProperty(key)){
                    bookings.push(
                        new Booking(
                            key,bookingdata[key].placeId , 
                            bookingdata[key].userId ,
                             bookingdata[key].noofGuest,
                             bookingdata[key].title,
                            bookingdata[key].firstname,
                            bookingdata[key].lastname,
                            bookingdata[key].fromdate,
                            bookingdata[key].todate)
                    )
                }
            }
            return bookings;
        }),tap((bookings)=>{
            this._bookings.next(bookings);
        }))
    }

    cancelBooking(bookingId:string){
        return this._http.delete(`https://angular-ionic-915f6.firebaseio.com//booking/${bookingId}.json`).pipe(
            switchMap(()=>{
                return this.bookings;
            }),
            take(1),
            tap((bookings)=>{
                console.log(bookings)
                this._bookings.next(bookings.filter(b => {
                    return b.id !== bookingId
                }))
            })
        )
       
    }
}