import { Component, OnInit } from '@angular/core';
//import {RestaurantsService} from '../../services/restaurants/restaurants.service';
import {Restaurant} from '../../shared/models/Restaurant'
import { ActivatedRoute } from '@angular/router';
import { ListingsService } from '../../listings.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  restaurants: Restaurant[] = [];
  filteredRestaurants: Restaurant[] = [];
  searchTitle: string = '';

  constructor(private restaurantsService: ListingsService) { }

  ngOnInit(): void {
    this.restaurantsService.getAllRestaurantsRoute().subscribe(restaurants => {
      this.restaurants = restaurants;
      this.filteredRestaurants = restaurants;
    });
  }

  filterRestaurants(event: Event): void {
    const query = (event.target as HTMLInputElement).value; // Cast event.target to HTMLInputElement
    this.filteredRestaurants = this.restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(query.toLowerCase())
    );
  }
}
