import { Component, OnInit } from '@angular/core';
import { Item, Restaurant } from '../../shared/models/Restaurant';
import { ActivatedRoute } from '@angular/router';
import { ListingsService } from '../../listings.service';
import { UserService } from '../../services/UserService';
import { MatDialog } from '@angular/material/dialog';
import { AddCartErrorComponent } from '../../pop-ups/add-cart-error/add-cart-error.component';

@Component({
  selector: 'app-restaurant-page',
  templateUrl: './restaurant-page.component.html',
  styleUrls: ['./restaurant-page.component.css']
})
export class RestaurantPageComponent implements OnInit {
  restaurant: Restaurant | undefined;
  item: Item | undefined;
  user_id!:string;
  user_id_num!:number;
  cartQuantity!:number;
  cartTotalPrice!:number;
  firstItem:number = 0;

  // Change the property name to activatedRoute
  constructor(private activatedRoute: ActivatedRoute, private restaurantsService: ListingsService, private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.restaurantsService.getUserRestaurantsByIdRoute(id).subscribe(restaurant => {
        this.restaurant = restaurant;    
        console.log("menu: " + restaurant.items)

        if (restaurant.items) {
          restaurant.items.forEach(item => {
            console.log("Item name: " + item.name);
            console.log("Item price: " + item.price);
            // Access other properties as needed
          });
        }
      });
    }
    this.user_id = this.activatedRoute.snapshot.paramMap.get('user_id')!;
    this.user_id_num = this.user_id !== null ? parseInt(this.user_id, 10) : 0; // Assuming default value of 0 if user_id is null
    console.log("step 2: " + this.user_id)
  }

  addToCart(item_id: number, name: string, price: number): void {
    //1. get cart, then check if it returns blank. if it returns blank, can add to cart.
    this.restaurantsService.getUserSpecificCartDetailsRoute(this.user_id).subscribe(cart => {
      if(cart.length == 0) {
        //perform the regular code
        this.addToTheCart(item_id, name, price);
        alert('Your item has been added to cart');
      }
      else {

        this.restaurantsService.getItemSpecificRoute(item_id).subscribe(item => {

          this.restaurantsService.getItemSpecificRoute(cart[0].item_id).subscribe(anotherItem => {
            // this.firstItem = anotherItem.id;
            console.log("rest id1: " + item.id);
            console.log("rest id2: " + anotherItem.id);
            if(item.id == anotherItem.id){
              this.addToTheCart(item_id, name, price);
              alert('Your item has been added to cart');
            }
            else{
              //how to make a popup image appear on the website saying "you can only add items from the same restaurant to cart"
              alert('You can only add items from the same restaurant to your cart');
              // console.log("can't add to cart")
            }
          });

        });  
      }
    });
  }

  addToTheCart(item_id: number, name: string, price: number): void {
    this.restaurantsService.addToCartRoute(this.user_id_num, item_id, name, price)
      .subscribe((response: any) => {
        // const id = response.results[0].id;
        // console.log('Restaurant ID:', id);
        // this.router.navigate([`/ownerPage/${this.user_id}/addrestaurant/${id}/addmenu`]);
        // Now you have the restaurant ID, you can use it as needed
        console.log("cart worked")
        // this.restaurantsService.getUserRestaurantsByIdRoute(id).subscribe(restaurant => {
        //   this.restaurant = restaurant;    
        //   console.log("menu: " + restaurant.items)
  
        //   if (restaurant.items) {
        //     restaurant.items.forEach(item => {
        //       console.log("Item name: " + item.name);
        //       console.log("Item price: " + item.price);
        //       // Access other properties as needed
        //     });
        //   }
        // });
        this.restaurantsService.getCartQuantityByIdRoute(this.user_id).subscribe(cartQuantity => {
          this.cartQuantity = cartQuantity;
          console.log("cart quantity: " + this.cartQuantity)
          this.restaurantsService.getCartSumByIdRoute(this.user_id).subscribe(cartTotalPrice => {
            this.cartTotalPrice = cartTotalPrice;
            console.log("cart totalprice: " + this.cartTotalPrice)
            this.restaurantsService.updateCartByIdRoute(this.user_id, this.cartQuantity, this.cartTotalPrice).subscribe({
              next: (updatedInfo) => {
                console.log('Update successful', updatedInfo);  
                // this.router.navigate(['/ownerPage', this.userId, 'updaterestaurant', this.restaurantId, 'menupage']);
                  // {path:'ownerPage/:user_id/updaterestaurant/:id/menupage', component:MenuPageComponent},
                  // {path:'ownerPage/:user_id/updaterestaurant/:id/menupage/:menuid', component:UpdateMenuComponent},
              },
              // ownerPage/:user_id/updaterestaurant/:restaurant_id/prompt_update/updatemenu
              error: (updateError) => {
                console.error('Failed to update cart', updateError);
              }
            });
          });
        });

      });
  }
}

