import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlaceService } from '../../place.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  offerForm:FormGroup

  constructor(private _placeservice:PlaceService , private _router:Router , private loadCtrl:LoadingController) { }

  ngOnInit() {
    this.offerForm = new FormGroup({
      title: new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required]
      }),
      description:new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required,Validators.minLength(10)]
      }),
      price:new FormControl({
        updateOn:'blur',
        validators:[Validators.required,Validators.min(1)]
      }),
      fromDate:new FormControl({
        updateOn:'blur',
        validators:[Validators.required]
      }),
      toDate:new FormControl({
        updateOn:'blur',
        validators:[Validators.required]
      })
    })
  }
  onCreateOffer(){
    console.log(this.offerForm);
    this.loadCtrl.create({
      message:'Creating the Place...'
    }).then((loadingEl)=>{
      loadingEl.present();
      this._placeservice.addPlaces(this.offerForm.value.title,this.offerForm.value.description,+this.offerForm.value.price,new Date(this.offerForm.value.fromDate),new Date(this.offerForm.value.toDate)).subscribe(()=>{
        loadingEl.dismiss();
        this.offerForm.reset();
        this._router.navigateByUrl("/places/tabs/offers")
      })
    })
   

  }

}
