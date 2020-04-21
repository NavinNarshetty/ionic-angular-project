import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlaceService } from '../../place.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Place } from '../../place.module';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit,OnDestroy {
  public place:Place;
  editForm:FormGroup;
  private placeSubscription:Subscription;

  constructor(private _route:ActivatedRoute,private _placeservice:PlaceService , private navCtrl:NavController,private router:Router,private loadCtrl:LoadingController) { }

  ngOnInit() {
    this._route.params.subscribe((param:Params)=>{
      if(!param){
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      this.placeSubscription=this._placeservice.findPlace(param.placeId).subscribe((place)=>{
        this.place = place;
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
      });
    })
  }

  onSubmit(){
    if(!this.editForm.valid){
      return;
    }
    console.log("i am clicked")
    this.loadCtrl.create({
      message:'Editing the offer ...'
    }).then((loadingEl)=>{
      loadingEl.present();
      this._placeservice.updatePlaces(this.place.id,this.editForm.value.title,this.editForm.value.description).subscribe(()=>{
        loadingEl.dismiss();
        this.router.navigateByUrl('/places/tabs/offers');
        
      })
    })
  }

  ngOnDestroy(){
    if(this.placeSubscription){
      this.placeSubscription.unsubscribe();
    }
  }

}
