import { Injectable } from '@angular/core';
import { Place } from './place.module';
import { BehaviorSubject, of } from 'rxjs';
import { take, map, delay, tap, switchMap } from "rxjs/operators";
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';

import { PlaceData } from "../shared/picker/location-picker/location.module";


interface NewPlaceData {
  avaliableFrom: Date;
  avaliableTo: Date;
  description: string
  imageUrl: string;
  price: number
  title: string
  userId: string,
  location:PlaceData
}

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  private _places=new BehaviorSubject<Place[]>([]);
  
  constructor(private _authservice:AuthService , private _http:HttpClient) { 
  }

  fetchPlaces(){
    return this._http.get<{[key:string]:NewPlaceData}>('https://angular-ionic-915f6.firebaseio.com/offerd-places.json').pipe(
      map((resutData)=>{
        let places =[];
        for(let key in resutData){
          if(resutData.hasOwnProperty(key)){
            places.push(
              new Place(key,resutData[key].title,resutData[key].imageUrl, resutData[key].description,resutData[key].price, new Date(resutData[key].avaliableFrom) , new Date(resutData[key].avaliableTo) , resutData[key].userId, resutData[key].location )
            )
          }
        }
        return places;
      }),
      tap((placeData)=>{
          this._places.next(placeData);
      })
    )
  }

  get places(){
    return this._places.asObservable()
  }

  findPlace(id:string){
    console.log(id,"id")
    return this._http.get(`https://angular-ionic-915f6.firebaseio.com/offerd-places/${id}.json`).pipe(map((placeData:NewPlaceData)=>{
     let editplace = new Place(id,placeData.title,placeData.imageUrl,placeData.description,placeData.price,new Date(placeData.avaliableFrom),new Date(placeData.avaliableTo),placeData.userId , placeData.location);
     return editplace;
    }))
  }

  addPlaces(title:string,description:string,price:number,datefrom:Date,dateto:Date,location:PlaceData){
    const newPlace = new Place(Math.random().toString(), 
    title,
    'https://images.unsplash.com/photo-1511316169965-fc8285861894?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80',
    description,
    price,
    datefrom,
    dateto,
    'xyz',
    location);
    //make the http call
    let generatedId=null;
    return this._http.post<{name:string}>('https://angular-ionic-915f6.firebaseio.com/offerd-places.json',{...newPlace, id:null}).pipe(
      switchMap((resultData)=>{
        console.log(resultData,"switch")
        generatedId= resultData.name
        return this.places
      }),
      take(1),
      tap((places)=>{
        newPlace.id = generatedId;
        this._places.next(places.concat(newPlace))
      })
    )
  }

  updatePlaces(placeId:string,title:string,description:string){
    let updatedPlaces=[]
    return this.places.pipe(take(1),
    switchMap((places)=>{
      if(!places || places.length <= 0){
        return this.fetchPlaces()
      }else{
        return of(places);
      }
    }),
    switchMap((places)=>{
      const updatedIndex = places.findIndex((p)=>{
        return p.id === placeId
      } )
      updatedPlaces = [...places]
      const oldPlace = updatedPlaces[updatedIndex];
      updatedPlaces[updatedIndex] = new Place(oldPlace.id , title,oldPlace.imageUrl,description,oldPlace.price,oldPlace.avaliableFrom,oldPlace.avaliableTo,this._authservice.userId,oldPlace.location);
      return this._http.put(`https://angular-ionic-915f6.firebaseio.com/offerd-places/${placeId}.json`,{
        ...  updatedPlaces[updatedIndex] , id:null
      })
    }),tap(()=>{
      this._places.next(updatedPlaces)
    }))
  }
}
