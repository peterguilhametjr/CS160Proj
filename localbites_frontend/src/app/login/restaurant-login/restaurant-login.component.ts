import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListingsService } from '../../listings.service';

@Component({
  selector: 'app-restaurant-login',
  templateUrl: './restaurant-login.component.html',
  styleUrl: './restaurant-login.component.css'
})
export class RestaurantLoginComponent {

  loginForm!: FormGroup;
  errorMessage: string = '';


  constructor(    private formBuilder: FormBuilder,
    private loginService: ListingsService,
    private route: ActivatedRoute,
    private router: Router) {

    // Initialize the form
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]    
    

    });
  }

    ngOnInit(): void {
    }
  
    onSubmit(): void {
      if (this.loginForm.valid) {
        this.loginService.RestaurantUserLoginRoute(
          this.loginForm.value.email, 
          this.loginForm.value.password
        ).subscribe({
          next: (res) => {
            console.log('Login successful, setting userData:', res);
            sessionStorage.setItem('userData', JSON.stringify(res));
            this.router.navigate([`/ownerPage/${res.user_id}`]);
          },
          // /${res.user_id}`
          error: (err) => {
            console.error('Login failed: ', err);
            // this.errorMessage = 'Login failed. Try signing up first!';
            alert("Login failed, try signing up first!")
          }
        });
      } else {
        console.error('Form is not valid');
        alert("Please fill out all fields correctly.")
      }
    }
    
    goToSignUpPage(): void {
      this.router.navigate(['restaurantSignup']);
    }

  }
