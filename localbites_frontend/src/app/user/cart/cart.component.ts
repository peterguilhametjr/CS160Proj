import { Component, OnInit } from '@angular/core';
import { Cart, Cart_Details } from '../../shared/models/Cart';
import { ListingsService } from '../../listings.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart_items: Cart_Details[] = [];
  user_id!:string;

  constructor(
    private cartService: ListingsService,
    private route: ActivatedRoute,
    private router: Router, // Inject Router
  ) { }

  ngOnInit(): void {
    // Retrieve the user ID from the URL
    this.route.paramMap.subscribe(params => {
      this.user_id = params.get('user_id')!;
      if (this.user_id) {
        this.cartService.getUserSpecificCartDetailsRoute(this.user_id).subscribe(cart_items => {
          this.cart_items = cart_items;
        });
        // this.userService.setUserId(this.user_id);
      }
      // console.log(this.user_id);
    });
    console.log("cart items: " + this.cart_items)
  }

  onDeleteClicked(id: number): void {
    console.log("whats the id: " + id)
    this.cartService.deleteCartRoute(id).subscribe(() => {
      // this.restaurants = this.restaurants.filter(
      //   restaurant => restaurant.id.toString() !== id
      // );
      this.cart_items = this.cart_items.filter(
        item => item.cart_item_id !== id
      )
      // console.log("itemid: " + id)
    });
  }

}
