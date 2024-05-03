import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ListingsService } from '../../../listings.service';

@Component({
  selector: 'app-update-restaurant',
  templateUrl: './update-restaurant.component.html'
})
export class UpdateRestaurantComponent implements OnInit {
  restaurantForm!: FormGroup;
  restaurantId!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private listingsService: ListingsService
  ) {}

  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.paramMap.get('id')!;  //give id from url to method loadrestaurant
    this.loadRestaurant();
  }

  loadRestaurant(): void {
    this.listingsService.getUserRestaurantsByIdRoute(this.restaurantId).subscribe(  //load variables from db to frontend
      restaurant => {
        console.log('Restaurant data:', restaurant);        // id for both items table and rstaraunt are now set to auto-increment so can't display or change it.
        this.restaurantForm = this.fb.group({
          name: [restaurant.name],
          location: [restaurant.location],
          tags: [restaurant.tags],
          stars: [restaurant.stars],
          imageURL: [restaurant.imageURL],
          zip_code: [restaurant.zip_code]

        });
      },
      error => {
        console.error('Error loading restaurant:', error);  
      }
    );
  }
  
  navigateToOwnerPage(): void {
    this.router.navigateByUrl('/ownerPage'); // Navigate to ownerPage URL
  }

  onSubmit(): void {
    if (this.restaurantForm.valid) {
      this.listingsService.updateRestaurantRoute(
        this.restaurantId,                // change other variables but not id ...
        this.restaurantForm.value.name,
        this.restaurantForm.value.location,
        this.restaurantForm.value.tags,
        this.restaurantForm.value.stars,
        this.restaurantForm.value.imageURL,
        this.restaurantForm.value.zip_code

      ).subscribe({
        next: (updatedInfo) => {
          console.log('Update successful', updatedInfo);  
          this.router.navigateByUrl('/ownerPage');
        },
        error: (updateError) => {
          console.error('Failed to update restaurant', updateError);
        }
      });
    }
  }
}
