import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../../place.service';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Place } from '../../place.module';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  public place:Place;
  editForm:FormGroup;

  constructor(private _route:ActivatedRoute,private _placeservice:PlaceService , private navCtrl:NavController) { }

  ngOnInit() {
    this._route.params.subscribe((param:Params)=>{
      if(!param){
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      this.place = this._placeservice.findPlace(param.placeId);
      this.editForm = new FormGroup({
        title:new FormControl(this.place.title,{
          updateOn:'blur',
          validators:[Validators.required]
        }),
        description:new FormControl(this.place.description,{
          updateOn:'blur',
          validators:[Validators.required]
        })
      })
    })
  }

}
