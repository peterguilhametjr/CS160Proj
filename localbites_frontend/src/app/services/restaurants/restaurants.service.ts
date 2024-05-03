import { Injectable } from '@angular/core';
import {Restaurant} from '../../shared/models/Restaurant';
@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  constructor() { }

  getFoodById(id: number): Restaurant{
    return this.getAll().find(restaurant => restaurant.id == id)!;
  }

  getAll():Restaurant[]{
    return [
      {
        id:1,
        name:"Burger King",
        tags: ["FastFood", "Takeout", "Burgers"],
        favorite: true,
        stars: 4.5,
        imageURL: '/assets/images/Restaurants/burgerking.jpg',
        location: "15478 Burger Lane, 95030"
      },
      {
        id:2,
        name:"KFC",
        tags: ["FastFood", "Takeout", "Fried Chicken"],
        favorite: true,
        stars: 4.0,
        imageURL: '/assets/images/Restaurants/kfc.jpg',
        location: "25718 Chicken Lane, 95030"
      },
      {
        id:3,
        name:"McDonalds",
        tags: ["FastFood", "Takeout", "Burgers"],
        favorite: false,
        stars: 2.5,
        imageURL: '/assets/images/Restaurants/McDonalds.jpg',
        location: "15479 Burger Lane, 95030"
      }
      // {
      //   id:4,
      //   name:"Gojo",
      //   tags: ["Hollow", "Purple"],
      //   favorite: true,
      //   stars: 5.0,
      //   imageURL: '/assets/images/Restaurants/hollowpurp.jpg',
      //   location: "00000 Smokin that Toji Pack, 95030"
      // }
    ]
  }
}

// id!:number;
// name!:string;
// tags?:string[];
// favorite:boolean = false;
// stars:number = 0;
// imageURL!:string;
// location!:string;

// '/assets/images/Restaurants/burgerking.jpg',
// '/assets/images/Restaurants/kfc.jpg',
// '/assets/images/Restaurants/McDonalds.jpg',
// '/assets/images/Restaurants/hollowpurp.jpg'