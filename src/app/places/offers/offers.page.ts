import { Component, OnInit, ViewChild } from '@angular/core';
import { Place } from '../place.module';
import { PlaceService } from '../place.service';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  public loadedOffers:Place[];
  constructor(private _placeservice:PlaceService , private _route:Router) { }

  ngOnInit() {
    this.loadedOffers =this._placeservice.places;
    console.log(this.loadedOffers ,"loaded offers")
  }
  

  onEdit(id:string , ionRef:IonItemSliding){
    console.log("clcicked")
    this._route.navigate(['/','places' , 'tabs','offers','edit',id])
    ionRef.close();
  }

}
