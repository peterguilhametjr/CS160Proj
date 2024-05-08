import { Component, OnInit } from '@angular/core';
//import {RestaurantsService} from '../../services/restaurants/restaurants.service';
import {Restaurant} from '../../shared/models/Restaurant'
import { ActivatedRoute } from '@angular/router';
import { ListingsService } from '../../listings.service';
import { UserService } from '../../services/UserService';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  restaurants: Restaurant[] = [];
  filteredRestaurants: Restaurant[] = [];
  searchTitle: string = '';
  user_id: string | null = '';
  searchTermName:string = '';
  searchTermZip:string = '';
  searchTermTags:string = '';

  
  constructor(private restaurantsService: ListingsService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.restaurantsService.getAllRestaurantsRoute().subscribe(restaurants => {
      this.restaurants = restaurants;
      this.filteredRestaurants = restaurants;
    });
    this.route.paramMap.subscribe(params => {
      this.user_id = params.get('user_id');
    });
    this.userService.setUserId(this.user_id!)
    console.log("something: " + this.user_id)
  }

  filterRestaurantsName(): void {
    // const query = (event.target as HTMLInputElement).value; // Cast event.target to HTMLInputElement
    this.filteredRestaurants = this.restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(this.searchTermName.toLowerCase())
    );
  
  }

  filterRestaurantsZip(): void {
    // const query = (event.target as HTMLInputElement).value; // Cast event.target to HTMLInputElement
    if (this.searchTermZip.length > 0) {
      this.filteredRestaurants = this.restaurants.filter(restaurant =>
        restaurant.zip_code.toLowerCase() === this.searchTermZip.toLowerCase()
      );
    }
    else {
      this.filteredRestaurants = this.restaurants.filter(restaurant =>
        restaurant.zip_code.toLowerCase().includes(this.searchTermZip.toLowerCase())
      );
    }
  }

  filterRestaurantsTags(): void {
    console.log("tags: " + this.restaurants[0].tags![0])
    this.filteredRestaurants = this.restaurants.filter(restaurant =>
      restaurant.tags!.includes(this.searchTermTags.toLowerCase())
    );
  }

}
