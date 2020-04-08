import { Component, OnInit } from '@angular/core';
import { Place } from '../../place.module';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlaceService } from '../../place.service';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit {

  public place:Place;

  constructor(private _route:ActivatedRoute, private navCtrl:NavController, private _placeservice:PlaceService) { }

  ngOnInit() {
    this._route.params.subscribe((param:Params)=>{
      if(!param){
        this.navCtrl.navigateBack('/place/tabs/offers')
      }
      this.place = this._placeservice.findPlace(param.placeId)
      console.log(this.place,"single place")
    })
  }

}
