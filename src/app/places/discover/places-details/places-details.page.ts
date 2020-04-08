import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Params } from '@angular/router';
import { PlaceService } from '../../place.service';
import { Place } from '../../place.module';
import { BookingmodalComponent } from '../../../bookings/bookingmodal/bookingmodal.component';

@Component({
  selector: 'app-places-details',
  templateUrl: './places-details.page.html',
  styleUrls: ['./places-details.page.scss'],
})
export class PlacesDetailsPage implements OnInit {

  public place:Place

  constructor(private navCtrl:NavController , private _route:ActivatedRoute , private _placeservice:PlaceService , private modalCtrl:ModalController) { }

  ngOnInit() {
    this._route.params.subscribe((param:Params)=>{
      if(!param){
        this.navCtrl.navigateBack('/places/tabs/discover')
        return;
      }
      this.place = this._placeservice.findPlace(param.placeId);
    })
  }

  onBook(){
    this.modalCtrl.create({
      component:BookingmodalComponent,
      componentProps:{
        selectedPlace:this.place
      }
    }).then((m)=>{
      m.present()
      return m.onDidDismiss()
    })
    .then((resultData)=>{
      console.log(resultData.data,resultData.role);
      if(resultData.role === 'confirm'){
        console.log('booked')
      }
    })
    // this.navCtrl.navigateBack('/places/tabs/discover')
  }

}
