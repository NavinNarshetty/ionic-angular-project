import { Component, OnInit, Input } from '@angular/core';
import { Place } from 'src/app/places/place.module';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-bookingmodal',
  templateUrl: './bookingmodal.component.html',
  styleUrls: ['./bookingmodal.component.scss'],
})
export class BookingmodalComponent implements OnInit {
  @Input() selectedPlace:Place
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}

  onCancel(){
    this.modalCtrl.dismiss(null,'cancel');
  }

  onBook(){
    this.modalCtrl.dismiss({
      message:'place is booked'
    },'confirm')
  }

}
