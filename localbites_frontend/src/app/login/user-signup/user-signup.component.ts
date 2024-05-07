import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListingsService } from '../../listings.service';
@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.css'
})
export class UserSignupComponent {
  signupForm!: FormGroup;
  cartId!: number;

  constructor(    private formBuilder: FormBuilder,
    private signupService: ListingsService,
    private route: ActivatedRoute,
    private router: Router) {

    // Initialize the form
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],    
      zip_code: ['', Validators.required],  
      password: ['', Validators.required]  
    });
  }

    ngOnInit(): void {
    }
  
    onSubmit(): void {
      // Check if form is valid , if it is take all the inputs from form and perfom post request. 
      if (this.signupForm.valid) {
        this.signupService.UserSignupRoute(
          this.signupForm.value.name,
          this.signupForm.value.email,
          this.signupForm.value.zip_code,
          this.signupForm.value.password
        ).subscribe({
          next: (res) => {
            console.log('Signup added successfully!', res);
            // this.router.navigate(['/searchPage'], { relativeTo: this.route }); 
          },
          error: (err) => {
            console.error('Error adding User: ', err);
          }
        });
        
        this.signupService.getUserIdRoute(
          this.signupForm.value.name,
          this.signupForm.value.email,
          this.signupForm.value.zip_code,
          this.signupForm.value.password
        ).subscribe(
          (response: any) => {
            console.log('retrieved userid succesffully!', response.results[0].user_id);
            this.cartId = response.results[0].user_id;
            console.log('try this: ' + this.cartId)
            this.signupService.cartInitializeRoute(
              this.cartId,
              0,
              0
            ).subscribe({
              next: (res) => {
                console.log('cart initialized!', res);
                // this.router.navigate(['/searchPage'], { relativeTo: this.route }); 
              },
              error: (err) => {
                console.log("cartID: " + this.cartId)
                console.error('Error initializing cart: ', err);
              }
            }
            );
          }
        );


        
        
      } else {
        console.error('Form is not valid');
      }
    }

    goToLoginPage(): void {
      this.router.navigate(['/users/login']);
    }
  }