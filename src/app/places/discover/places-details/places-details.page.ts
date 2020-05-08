import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, ModalController, ActionSheetController, LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PlaceService } from '../../place.service';
import { Place } from '../../place.module';
import { BookingmodalComponent } from '../../../bookings/bookingmodal/bookingmodal.component';
import { Subscription } from 'rxjs';
import { BookingService } from 'src/app/bookings/bookings.service';
import { AuthService } from 'src/app/auth/auth.service';
import { MapModalComponent } from 'src/app/shared/map-modal/map-modal.component';
import { take, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-places-details',
  templateUrl: './places-details.page.html',
  styleUrls: ['./places-details.page.scss'],
})
export class PlacesDetailsPage implements OnInit,OnDestroy {

  public place:Place;
  private placeSub:Subscription;
  public isBookable:boolean;
  public isloading:boolean = false;

  constructor(private navCtrl:NavController ,
     private _route:ActivatedRoute ,
      private _placeservice:PlaceService , 
      private modalCtrl:ModalController ,
      private _actionCtrl:ActionSheetController,
      private _bookingservice:BookingService,
      private _loadCtrl:LoadingController,
      private _router:Router,
      private _authservice:AuthService,
      private alterCtrl:AlertController) { }

  ngOnInit() {
    this._route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.isloading = true;
      let fetchedUserId: string;
      this._authservice.userId
        .pipe(
          take(1),
          switchMap(userId => {
            if (!userId) {
              throw new Error('Found no user!');
            }
            fetchedUserId = userId;
            return this._placeservice.findPlace(paramMap.get('placeId'));
          })
        )
        .subscribe(
          place => {
            this.place = place;
            this.isBookable = place.userId !== fetchedUserId;
            this.isloading = false;
          },error => {
            this.isloading= false;
            console.log(error)
            this.alterCtrl
              .create({
                header: 'An error ocurred!',
                message: 'Could not load place.',
                buttons: [
                  {
                    text: 'Okay',
                    handler: () => {
                      this._router.navigate(['/places/tabs/discover']);
                    }
                  }
                ]
              })
              .then(alertEl => alertEl.present());
          }
        );
    });
  }

  onBook(){
    this._actionCtrl.create({
      header:'Choose from Actions',
      buttons:[{
        text:'Select Data',
        handler:()=>{
          this.openBookingModal('select');
        }
      },{
        text:'Random Date',
        handler:()=>{
          this.openBookingModal('random');
        }
      },{
        text:'Cancel',
        role:'cancel'
      }]
    }).then((m)=>{
      return m.present();
    })
  }

  openBookingModal(mode: 'select' | 'random'){
    console.log(mode)
    this.modalCtrl.create({
      component:BookingmodalComponent,
      componentProps:{
        selectedPlace:this.place,
        selectedMode:mode
      }
    }).then((m)=>{
      m.present()
      return m.onDidDismiss()
    })
    .then((resultData)=>{
      console.log(resultData.data,resultData.role);
      if(resultData.role === 'confirm'){
        console.log('booked')
        this._loadCtrl.create({
          message:'Confirming your booking .....'
        }).then((loadingEL)=>{
          loadingEL.present()
          this._bookingservice.addBooking(this.place.id,
            resultData.data.bookingData.noOfGuests,
            this.place.title,
            resultData.data.bookingData.firstName,
            resultData.data.bookingData.lastName,
            resultData.data.bookingData.avaliablefrom,
            resultData.data.bookingData.avaliableto).subscribe(()=>{
              loadingEL.dismiss();
              this._router.navigateByUrl("/bookings")
            });
        })
       
      }
    })
  }
  onShowFullMap() {
    this.modalCtrl
      .create({
        component: MapModalComponent,
        componentProps: {
          center: {
            lat: this.place.location.lat,
            lng: this.place.location.lng
          },
          selectable: false,
          closeButtonText: 'Close',
          title: this.place.location.placeAddress
        }
      })
      .then(modalEl => {
        modalEl.present();
      });
  }

  ngOnDestroy(){
    if(this.placeSub){
      this.placeSub.unsubscribe();
    }
  }

}
