import { Component, OnInit } from '@angular/core';
import { Item, Restaurant } from '../../shared/models/Restaurant';
import { ActivatedRoute } from '@angular/router';
import { ListingsService } from '../../listings.service';
import { UserService } from '../../services/UserService';

@Component({
  selector: 'app-restaurant-page',
  templateUrl: './restaurant-page.component.html',
  styleUrls: ['./restaurant-page.component.css']
})
export class RestaurantPageComponent implements OnInit {
  restaurant: Restaurant | undefined;
  item: Item | undefined;
  user_id!:string;
  user_id_num!:number;
  // Change the property name to activatedRoute
  constructor(private activatedRoute: ActivatedRoute, private restaurantsService: ListingsService, private userService: UserService) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.restaurantsService.getUserRestaurantsByIdRoute(id).subscribe(restaurant => {
        this.restaurant = restaurant;    
        console.log("menu: " + restaurant.items)

        if (restaurant.items) {
          restaurant.items.forEach(item => {
            console.log("Item name: " + item.name);
            console.log("Item price: " + item.price);
            // Access other properties as needed
          });
        }
      });
    }
    this.user_id = this.activatedRoute.snapshot.paramMap.get('user_id')!;
    this.user_id_num = this.user_id !== null ? parseInt(this.user_id, 10) : 0; // Assuming default value of 0 if user_id is null
    console.log("step 2: " + this.user_id)
  }

  addToCart(item_id: number, name: string, price: number): void {
    // this.restaurantsService.addToCartRoute().subscribe(... =>)
    this.restaurantsService.addToCartRoute(this.user_id_num, item_id, name, price)
      .subscribe((response: any) => {
        // const id = response.results[0].id;
        // console.log('Restaurant ID:', id);
        // this.router.navigate([`/ownerPage/${this.user_id}/addrestaurant/${id}/addmenu`]);
        // Now you have the restaurant ID, you can use it as needed
        console.log("cart worked")
      });
  }
}

