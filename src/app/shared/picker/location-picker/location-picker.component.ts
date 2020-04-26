import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapModalComponent } from '../../map-modal/map-modal.component';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../environments/environment";
import { map, switchMap } from 'rxjs/operators';
import { PlaceData } from './location.module';
import { of } from 'rxjs';


@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {
  @Output() locationPick= new EventEmitter<PlaceData>()
  public staticImageUrl:string;
  public isLoading:boolean = false;
  

  constructor(private modalCtrl:ModalController, private _http:HttpClient) { }

  ngOnInit() {}



  onselectLocation(){
    console.log("i am clicked again")
    this.modalCtrl.create({
      component:MapModalComponent
    }).then((mapModalEl)=>{
      mapModalEl.onDidDismiss().then((modalData)=>{
        console.log(modalData)
        if(modalData.data == undefined){

          return null;
        }
        
        const placeData:PlaceData={
          lat:modalData.data.lat,
          lng:modalData.data.lng,
          placeAddress:null,
          statisImageUrl:null,
        }
        this.isLoading = true;
        this.getAdress(modalData.data.lat , modalData.data.lng).pipe(
          switchMap((address)=>{
            placeData.placeAddress = address;
            return of(this.getStaticImageURl(placeData.lat , placeData.lng , 14))
          })
        ).subscribe((staticImageUrl)=>{
          placeData.statisImageUrl = staticImageUrl;
          this.staticImageUrl = staticImageUrl;
          this.locationPick.emit(placeData)
          this.isLoading = false;
        })
      })
      mapModalEl.present()
    })
  }


  private getAdress(lat:string , lng:string){
    return this._http.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.API_KEY}`)
    .pipe(map((googleData)=>{
      if(!googleData || !googleData.results || googleData.results.length ===0 ){
        return null;
      }
      
      return googleData.results[0].formatted_address;
    }))
  }

  private getStaticImageURl(lat:string , lng:string , zoom:number){
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=400x400&maptype=roadmap
    &markers=color:red%7Clabel:Place%7C${lat},${lng}
    &key=${environment.API_KEY}`
    // https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=500x300&maptype=roadmap
    // &markers=color:red%7Clabel:Place%7C${lat},${lng}
    // &key=${environment.googleMapsAPIKey}`;
  }


  
}
