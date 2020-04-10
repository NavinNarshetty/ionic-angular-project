import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../place.service';
import { SegmentChangeEventDetail } from '@ionic/core';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  public loadedPlaces=[]
  constructor(private _placeservice:PlaceService) { }

  ngOnInit() {
    this.loadedPlaces = this._placeservice.places;
    console.log(this.loadedPlaces);
  }

  onFilterPlaces(event:CustomEvent<SegmentChangeEventDetail>){
    console.log(event.detail)
  }

}
