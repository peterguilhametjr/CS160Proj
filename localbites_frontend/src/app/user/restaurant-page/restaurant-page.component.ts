import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../shared/models/Restaurant';
import { ActivatedRoute } from '@angular/router';
import { ListingsService } from '../../listings.service';

@Component({
  selector: 'app-restaurant-page',
  templateUrl: './restaurant-page.component.html',
  styleUrls: ['./restaurant-page.component.css']
})
export class RestaurantPageComponent implements OnInit {
  restaurant: Restaurant | undefined;
  // Change the property name to activatedRoute
  constructor(private activatedRoute: ActivatedRoute, private restaurantsService: ListingsService) {}

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
  }
}

