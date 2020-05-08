import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlaceService } from '../place.service';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit,OnDestroy {

  public loadedPlaces=[];
  public newloadedPlaces=[];
  public releventPlaces=[];
  private loadedPlaceSub:Subscription;
  constructor(private _placeservice:PlaceService , private authservice:AuthService) { }

  ngOnInit() {

  this.loadedPlaceSub=  this._placeservice.places.subscribe((places)=>{
      this.loadedPlaces = places;
      this.releventPlaces = this.loadedPlaces;
      this.newloadedPlaces = this.loadedPlaces.slice(1)
    });
  }

  ionViewWillEnter(){
    this._placeservice.fetchPlaces().subscribe()
  }

  onFilterPlaces(event:CustomEvent<SegmentChangeEventDetail>){
    console.log(event.detail)
    this.authservice.userId.pipe(take(1)).subscribe((userId)=>{
      if(event.detail.value === "all"){
        this.releventPlaces = this.loadedPlaces;
        this.newloadedPlaces = this.releventPlaces.slice(1)
      }else{
        this.releventPlaces = this.loadedPlaces.filter((place)=>{
          return place.userId !== userId;
        })
        this.newloadedPlaces = this.releventPlaces.slice(1);
      }
    })
    
  }

  ngOnDestroy(){
    if(this.loadedPlaceSub){
      this.loadedPlaceSub.unsubscribe();
    }
  }

}
