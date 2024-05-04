import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './user/header/header.component';
import { SearchComponent } from './user/search/search.component';
import { SearchBarComponent } from './user/search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './user/cart/cart.component';
import { OffersPageComponent } from './user/offers-page/offers-page.component';
import { RestaurantPageComponent } from './user/restaurant-page/restaurant-page.component';
import { OwnerPageComponent } from './owner/owner-page/owner-page.component';
import { DriverPageComponent } from './driver/driver-page/driver-page.component';
import { OwnerTaskBarComponent } from './owner/owner-task-bar/owner-task-bar.component';
import { AddRestaurantComponent } from './owner/owner-page/add-restaurant/add-restaurant.component';
import { RestaurantDetailsComponent } from './owner/owner-page/restaurant-details/restaurant-details.component';
import { UpdateRestaurantComponent } from './owner/owner-page/update-restaurant/update-restaurant.component';
// import { RestaurantDataFormComponent } from './owner/owner-page/restaurant-data-form/restaurant-data-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuPageComponent } from './owner/menu-page/menu-page.component';
import { AddMenuComponent } from './owner/menu-page/add-menu/add-menu.component';
import { UpdateMenuComponent } from './owner/menu-page/update-menu/update-menu.component';
import { UserLoginComponent } from './login/user-login/user-login.component';
import { UserMenuComponent } from './user/restaurant-page/user-menu/user-menu.component';
import { UserSignupComponent } from './login/user-signup/user-signup.component';
import { RestaurantSignupComponent } from './login/restaurant-signup/restaurant-signup.component';
import { RestaurantLoginComponent } from './login/restaurant-login/restaurant-login.component';
import { PromptAddPageComponent } from './owner/prompt-add-page/prompt-add-page.component';
import { PromptUpdatePageComponent } from './owner/prompt-update-page/prompt-update-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    SearchBarComponent,
    HomeComponent,
    CartComponent,
    OffersPageComponent,
    RestaurantPageComponent,
    OwnerPageComponent,
    DriverPageComponent,
    OwnerTaskBarComponent,
    AddRestaurantComponent,
    RestaurantDetailsComponent,
    UpdateRestaurantComponent,
    MenuPageComponent,
    AddMenuComponent,
    UpdateMenuComponent,
    UserLoginComponent,
    UserMenuComponent,
    UserSignupComponent,
    RestaurantSignupComponent,
    RestaurantLoginComponent,
    PromptAddPageComponent,
    PromptUpdatePageComponent
   // RestaurantDataFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],

providers: [provideHttpClient(withFetch()), provideClientHydration()],

bootstrap: [AppComponent]
})
export class AppModule { }
