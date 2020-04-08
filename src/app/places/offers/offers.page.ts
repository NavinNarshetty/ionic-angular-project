import { Component, OnInit } from '@angular/core';
import { Place } from '../place.module';
import { PlaceService } from '../place.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  public loadedOffers:Place[];
  constructor(private _placeservice:PlaceService) { }

  ngOnInit() {
    this.loadedOffers =this._placeservice.places;
    console.log(this.loadedOffers ,"loaded offers")
  }
  

}
