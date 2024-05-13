// import { Component } from '@angular/core';
// import { Router } from '@angular/router';


// @Component({
//   selector: 'app-user-login',
//   templateUrl: './user-login.component.html',
//   styleUrl: './user-login.component.css'
// })
// export class UserLoginComponent {
//   isSignDivVisiable: boolean = true;

//     signUpObj: SignUpModel = new SignUpModel();
//     loginObj: LoginModel = new LoginModel();

//     constructor(private router: Router){}

//     onRegister(){
//       debugger;
//       const localUser = localStorage.getItem('angular17users');
//       if(localUser != null) {
//         const users =  JSON.parse(localUser);
//         users.push(this.signUpObj);
//         localStorage.setItem('angular17users', JSON.stringify(users));
//       } else {
//         const users = [];
//         users.push(this.signUpObj);
//         localStorage.setItem('angular17users', JSON.stringify(users));
//       }
//       alert("Registered Successfully, proceed to Login!");
//     }

//     onLogin(){
//       debugger;
//     const localUsers =  localStorage.getItem('angular17users');
//     if(localUsers != null) {
//       const users =  JSON.parse(localUsers);

//       const isUserPresent =  users.find( (user:SignUpModel)=> user.email == this.loginObj.email && user.password == this.loginObj.password);
//       if(isUserPresent != undefined) {
//         alert("Login successful!");
//         localStorage.setItem('loggedUser', JSON.stringify(isUserPresent));
//         this.router.navigateByUrl('searchPage');
//       } else {
//         alert("User and/or password does not exist")
//       }
//     }
//     }

// }

// export class SignUpModel{
//   name: String;
//   email: String;
//   password: String;
//   address: String;
//   zipcode: String;

//   constructor() {
//     this.email = "";
//     this.name = "";
//     this.password= "";
//     this.address="";
//     this.zipcode="";
//   }
// }

// export class LoginModel{
//   email: String;
//   password: String;

//   constructor() {
//     this.email = "";
//     this.password= "";
//   }
// }




import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListingsService } from '../../listings.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
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
        this.loginService.UserLoginRoute(
          this.loginForm.value.email, 
          this.loginForm.value.password
        ).subscribe({
          next: (res) => {
            console.log('Login successful, setting userData:', res);
            sessionStorage.setItem('userData', JSON.stringify(res));
            this.router.navigate([`/searchPage/${res.user_id}`]);
          },
          error: (err) => {
            console.error('Login failed: ', err);
            alert("Login failed, try signing up first!")
          }
        });
      } else {
        console.error('Form is not valid');
        // this.errorMessage = 'Please fill out all fields correctly.';
        alert("Please fill out all fields correctly.")
      }
    }

    goToSignUpPage(): void {
      this.router.navigate(['userSignup']);
    }
    

  }
