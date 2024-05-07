import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListingsService } from '../../../listings.service';
import { Restaurant } from '../../../shared/models/Restaurant';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css'] 
})
export class AddRestaurantComponent implements OnInit {
  restaurantForm: FormGroup;
  user_id: string | null = '';
  user_id_num: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private restaurantService: ListingsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialize the form
    this.restaurantForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      tags: [''],   // add commas to seperat
      imageURL: [''],
      zip_code: ['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.user_id = params.get('user_id');
      // if (this.user_id) {
      //   this.restaurantsService.getUserSpecificRestaurantRoute(this.user_id).subscribe(restaurants => {
      //     this.restaurants = restaurants;
      //   });
      // }
      // Convert user_id from string | null to number
      this.user_id_num = this.user_id ? parseInt(this.user_id, 10) : 0; // Assuming default value of 0 if user_id is null
      console.log("something: " + this.user_id);
    });
  }

  onSubmit(): void {
    // Check if form is valid , if it is take all the inputs from form and perfom post request. 
    if (this.restaurantForm.valid) {
      this.restaurantService.addRestaurantRoute(
        this.restaurantForm.value.name,
        this.restaurantForm.value.location,
        this.restaurantForm.value.tags,
        this.restaurantForm.value.imageURL,
        this.restaurantForm.value.zip_code,
        this.user_id_num
      ).subscribe({
        next: (res) => {
          // const num = res.id;
          // console.log('Restaurant added successfully!', num);
          // Assuming this is within a component or service where you have access to the RestaurantService


          // const rest_id = this.restaurantService.getRestaurantIdRoute(this.user_id_num, res.name, res.location);
          // console.log('rest_id: ' + rest_id);
          // this.router.navigate([`/searchPage/${res.user_id}`]);
          // ownerPage/:user_id/addrestaurant/:restaurant_id/prompt_add

          // ownerPage/:user_id/addrestaurant/:restaurant_id/prompt_add
          // console.log('How about this!', num);
        },
        error: (err) => {
          console.error('Error adding restaurant: ', err);
        }
      });

      this.restaurantService.getRestaurantIdRoute(this.user_id_num, this.restaurantForm.value.name, this.restaurantForm.value.location)
      .subscribe((response: any) => {
        const id = response.results[0].id;
        // console.log('Restaurant ID:', id);
        this.router.navigate([`/ownerPage/${this.user_id}/addrestaurant/${id}/addmenu`]);
        // Now you have the restaurant ID, you can use it as needed
      });


      
      
    } else {
      console.error('Form is not valid');
    }
  }
}