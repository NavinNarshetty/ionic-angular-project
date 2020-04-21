import { Injectable } from '@angular/core';
import { Place } from './place.module';
import { BehaviorSubject } from 'rxjs';
import { take, map, delay, tap } from "rxjs/operators";
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  private _places=new BehaviorSubject<Place[]>([
    new Place('p1','New york' , 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' , 'The city of light' , 149 , new Date('2020-01-01'), new Date('2020-12-31'),'abc'),
  new Place('p2','France' , 'https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' , 'The Romantic city' , 150,new Date('2020-01-01'), new Date('2020-12-31'),'xyz'),
  new Place('p3','Spain' , 'https://images.unsplash.com/photo-1485111776963-19787ff041f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80' , 'La Masia' , 190,new Date('2020-01-01'), new Date('2020-12-31'),'xyz'),
  new Place('p4','Ice Land' , 'https://images.unsplash.com/photo-1473654729523-203e25dfda10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' , 'The city of light' , 200,new Date('2020-01-01'), new Date('2020-12-31'),'abc'),
  new Place('p5','Ice Earth' , 'https://images.unsplash.com/photo-1473654729523-203e25dfda10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' , 'The city of light' , 200,new Date('2020-01-01'), new Date('2020-12-31'),'xyz')
  ]);
  
  constructor(private _authservice:AuthService) { 
  }

  get places(){
    return this._places.asObservable()
  }

  findPlace(id:string){
    console.log(id,"id")
    return this.places.pipe(take(1),map((places)=>{
      return places.find(p => p.id === id);
    }))
  }

  addPlaces(title:string,description:string,price:number,datefrom:Date,dateto:Date){
    const newPlace = new Place(Math.random().toString(), 
    title,
    'https://images.unsplash.com/photo-1473654729523-203e25dfda10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    description,
    price,
    datefrom,
    dateto,
    'xyz');
    return this.places.pipe(take(1),delay(1000),tap((places)=>{
      this._places.next(places.concat(newPlace))
    }))
  }

  updatePlaces(placeId:string,title:string,description:string){
    return this.places.pipe(take(1),tap((places)=>{
      const updatedIndex = places.findIndex((p)=>{
        return p.id === placeId
      } )
      const updatedPlaces = [...places]
      const oldPlace = updatedPlaces[updatedIndex];
      updatedPlaces[updatedIndex] = new Place(oldPlace.id , title,oldPlace.imageUrl,description,oldPlace.price,oldPlace.avaliableFrom,oldPlace.avaliableTo,this._authservice.userId);
      this._places.next(updatedPlaces)
    }))
  }
}
