import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListingsService } from '../../listings.service';

@Component({
  selector: 'app-restaurant-signup',
  templateUrl: './restaurant-signup.component.html',
  styleUrl: './restaurant-signup.component.css'
})
export class RestaurantSignupComponent {
  signupForm!: FormGroup;

  constructor(    private formBuilder: FormBuilder,
    private signupService: ListingsService,
    private route: ActivatedRoute,
    private router: Router) {

    // Initialize the form
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],    
      password: ['', Validators.required]  
    });
  }

    ngOnInit(): void {
    }
  
    onSubmit(): void {
      // Check if form is valid , if it is take all the inputs from form and perfom post request. 
      if (this.signupForm.valid) {
        this.signupService.RestaurantUserSignupRoute(
          this.signupForm.value.name,
          this.signupForm.value.email,
          this.signupForm.value.password
        ).subscribe({
          next: (res) => {
            console.log('Signup added successfully!', res);
            this.router.navigate(['/ownerPage'], { relativeTo: this.route }); 
          },
          error: (err) => {
            console.error('Error adding User: ', err);
          }
        });
        
        
      } else {
        console.error('Form is not valid');
      }
    }

    goToLoginPage(): void {
      this.router.navigate(['/restaurant/login']);
    }
  }