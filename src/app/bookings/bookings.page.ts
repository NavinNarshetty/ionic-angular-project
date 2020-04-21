import { Component, OnInit } from '@angular/core';
import { BookingService } from './bookings.service';
import { Booking } from './bookings.model';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  public yourBookings:Booking[];

  constructor(private _bookingservice:BookingService) { }

  ngOnInit() {
   this._bookingservice.bookings.subscribe((bookings)=>{
    this.yourBookings = bookings;
   });
  }

  deleteBooking(bookingId:string , slideRef:IonItemSliding){
    console.log("Deleted");
    slideRef.close();
    this._bookingservice.cancelBooking(bookingId).subscribe();

  }
}
