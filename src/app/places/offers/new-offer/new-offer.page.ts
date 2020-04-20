import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  offerForm:FormGroup

  constructor() { }

  ngOnInit() {
    this.offerForm = new FormGroup({
      title: new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required]
      }),
      description:new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required,Validators.minLength(100)]
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
    console.log(this.offerForm)
  }

}
