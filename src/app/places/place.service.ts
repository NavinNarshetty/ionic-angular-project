import { Injectable } from '@angular/core';
import { Place } from './place.module';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  private _places:Place[]=[
    new Place('p1','New york' , 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' , 'The city of light' , 149 , new Date('2020-01-01'), new Date('2020-12-31')),
    new Place('p2','France' , 'https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' , 'The Romantic city' , 150,new Date('2020-01-01'), new Date('2020-12-31')),
    new Place('p3','Spain' , 'https://images.unsplash.com/photo-1485111776963-19787ff041f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80' , 'La Masia' , 190,new Date('2020-01-01'), new Date('2020-12-31')),
    new Place('p1','Ice Land' , 'https://images.unsplash.com/photo-1473654729523-203e25dfda10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' , 'The city of light' , 200,new Date('2020-01-01'), new Date('2020-12-31')),
  ];
  constructor() { 
  }

  get places(){
    return [...this._places]
  }

  findPlace(id:string){
    console.log(id,"id")
    return this._places.find(p => p.id === id)
  }
}
