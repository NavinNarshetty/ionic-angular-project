import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Place } from '../place.module';
import { PlaceService } from '../place.service';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit,OnDestroy {

  public loadedOffers:Place[];
  private loadedofferSubscription:Subscription;
  constructor(private _placeservice:PlaceService , private _route:Router) { }

  ngOnInit() {
    this.loadedofferSubscription=this._placeservice.places.subscribe((places)=>{
      this.loadedOffers = places;
      console.log(this.loadedOffers)
    });
  }

  ionViewWillEnter(){
    this._placeservice.fetchPlaces().subscribe()
  }
  

  onEdit(id:string , ionRef:IonItemSliding){
    console.log("clcicked",id);
    this._route.navigate(['/','places','tabs','offers','edit',id])
    ionRef.close();
  }

  ngOnDestroy(){
    if(this.loadedofferSubscription){
      this.loadedofferSubscription.unsubscribe()
    }
  }

}
