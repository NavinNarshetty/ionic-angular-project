import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Place } from 'src/app/places/place.module';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-bookingmodal',
  templateUrl: './bookingmodal.component.html',
  styleUrls: ['./bookingmodal.component.scss'],
})
export class BookingmodalComponent implements OnInit {
  @Input() selectedPlace:Place;
  @Input() selectedMode:'select' | 'random';
  @ViewChild('f',{
    static:false
  }) bookingForm:NgForm;
  startDate:string;
  endDate:string;
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
    const avaliableFrom = new Date(this.selectedPlace.avaliableFrom);
    const avaliableTo = new Date(this.selectedPlace.avaliableTo);
    if(this.selectedMode === 'random'){
      this.startDate = new Date(avaliableFrom.getTime() +  Math.random() * (avaliableFrom.getTime() - 7 * 24 * 60 * 60 * 1000)).toISOString();
      this.endDate = new Date(avaliableTo.getTime() + Math.random() * (avaliableTo.getTime() + 7 * 24 * 60 *60 *1000)).toISOString();
    }
  }

  onCancel(){
    this.modalCtrl.dismiss(null,'cancel');
  }

  onSubmit(){
    if(!this.bookingForm.valid && !this.dateValid()){
      return
    }
    this.modalCtrl.dismiss({
      bookingData:{
        firstName:this.bookingForm.value['first-name'],
        lastName:this.bookingForm.value['last-name'],
        noOfGuests:this.bookingForm.value['no-of-guest'],
        avaliablefrom:this.bookingForm.value['from-date'],
        avaliableto:this.bookingForm.value['to-date']
      }
    },'confirm')
  }

  dateValid(){
    const startDate = this.bookingForm.value['from-date'];
    const endDate = this.bookingForm.value['to-date'];
    return endDate > startDate;
  }

}
