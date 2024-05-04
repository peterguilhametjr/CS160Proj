import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './user/search/search.component';
import { OffersPageComponent } from './user/offers-page/offers-page.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './user/cart/cart.component';
import { RestaurantPageComponent } from './user/restaurant-page/restaurant-page.component';
import { OwnerPageComponent } from './owner/owner-page/owner-page.component';
import { DriverPageComponent } from './driver/driver-page/driver-page.component';
import { AddRestaurantComponent } from './owner/owner-page/add-restaurant/add-restaurant.component';
import { UpdateRestaurantComponent } from './owner/owner-page/update-restaurant/update-restaurant.component';
import { MenuPageComponent } from './owner/menu-page/menu-page.component';
import { AddMenuComponent } from './owner/menu-page/add-menu/add-menu.component';
import { UpdateMenuComponent } from './owner/menu-page/update-menu/update-menu.component';
import { UserMenuComponent } from './user/restaurant-page/user-menu/user-menu.component';
import { UserSignupComponent } from './login/user-signup/user-signup.component';
import { UserLoginComponent } from './login/user-login/user-login.component';
import { RestaurantSignupComponent } from './login/restaurant-signup/restaurant-signup.component';
import { RestaurantLoginComponent } from './login/restaurant-login/restaurant-login.component';
import { AuthGuard } from './login/auth.guard';
import { PromptAddPageComponent } from './owner/prompt-add-page/prompt-add-page.component';
import { PromptUpdatePageComponent } from './owner/prompt-update-page/prompt-update-page.component';



const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'userSignup', component:UserSignupComponent},
  {path:'restaurantSignup', component:RestaurantSignupComponent}, 
  {path:'restaurant/login', component:RestaurantLoginComponent},

  {path:'users/login', component:UserLoginComponent},
  { path:'searchPage/:user_id', component: SearchComponent, canActivate: [AuthGuard] },
  
  {path:'searchPage/search/:searchTerm', component:SearchComponent},
  {path:'offersPage', component:OffersPageComponent}, 
  {path:'cartPage', component:CartComponent}, // need to add id
  {path:'restaurant/:id', component:RestaurantPageComponent},
  {path:'ownerPage/:user_id', component:OwnerPageComponent}, // need to add id
  {path:'driverPage', component:DriverPageComponent},

  {path:'ownerPage/:user_id/updaterestaurant/:id', component:UpdateRestaurantComponent},
  // {path:'ownerPage/:user_id/updaterestaurant/:restaurant_id/menu_page', component:PromptUpdatePageComponent},
  {path:'ownerPage/:user_id/updaterestaurant/:id/menupage', component:MenuPageComponent},
  {path:'ownerPage/:user_id/updaterestaurant/:id/menupage/:menuid', component:UpdateMenuComponent},

  {path:'ownerPage/:user_id/addrestaurant', component:AddRestaurantComponent}, // need to add id
  // {path:'ownerPage/:user_id/addrestaurant/:restaurant_id/prompt_add', component: PromptAddPageComponent},
  {path:'ownerPage/:user_id/addrestaurant/:id/addmenu', component:AddMenuComponent},

  // {path:'restaurant/:id/menu', component:UserMenuComponent}


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
