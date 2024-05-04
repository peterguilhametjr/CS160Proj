import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../shared/models/Restaurant';
import { ListingsService } from '../../listings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/UserService';

@Component({
  selector: 'app-owner-page',
  templateUrl: './owner-page.component.html',
  styleUrls: ['./owner-page.component.css'] 
})
export class OwnerPageComponent implements OnInit {

  restaurants: Restaurant[] = [];
  filteredRestaurants: Restaurant[] = [];
  searchTitle: string = '';
  restaurant: any;
  user_id: string | null = '';

  constructor(
    private restaurantsService: ListingsService,
    private route: ActivatedRoute,
    private router: Router, // Inject Router
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // Retrieve the user ID from the URL
    this.route.paramMap.subscribe(params => {
      this.user_id = params.get('user_id');
      if (this.user_id) {
        this.restaurantsService.getUserSpecificRestaurantRoute(this.user_id).subscribe(restaurants => {
          this.restaurants = restaurants;
        });
        this.userService.setUserId(this.user_id);
      }
      // console.log(this.user_id);
    });
  }

  

  navigateToAddRestaurant(): void{
    if (this.user_id) {
      this.router.navigate(['/ownerPage', this.user_id, 'addrestaurant'])
      console.log("work: " + this.user_id);
    }
    else {
      console.error("User ID not available")
    }
  }



  navigateToUpdatePage(id: number): void {
    if (this.user_id) {
      this.router.navigate(['/ownerPage', this.user_id, 'updaterestaurant', id])
      
      console.log("work: " + this.user_id);
    }
    else {
      console.error("User ID not available")
    }
  }

  onDeleteClicked(id: string): void {
    this.restaurantsService.deleteRestaurantRoute(id).subscribe(() => {
      this.restaurants = this.restaurants.filter(
        restaurant => restaurant.id.toString() !== id
      );
    });
  }

  navigateToMenuPage(id: string): void {  
    this.router.navigate(['/ownerPage/menu', id]);
  }
}  
