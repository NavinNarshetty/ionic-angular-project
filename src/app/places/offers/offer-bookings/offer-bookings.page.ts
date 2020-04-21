import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from '../../place.module';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlaceService } from '../../place.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit,OnDestroy {

  public place:Place;
  private ofeerplaceSubscription:Subscription;

  constructor(private _route:ActivatedRoute, private navCtrl:NavController, private _placeservice:PlaceService) { }

  ngOnInit() {
    this._route.params.subscribe((param:Params)=>{
      if(!param){
        this.navCtrl.navigateBack('/place/tabs/offers')
      }
      this.ofeerplaceSubscription=  this._placeservice.findPlace(param.placeId).subscribe((place)=>{
        this.place = place;
      })
    })
  }

  ngOnDestroy(){
    if(this.ofeerplaceSubscription){
      this.ofeerplaceSubscription.unsubscribe()
    }
  }

}
