import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Cart, Cart_Details } from '../../shared/models/Cart';
import { ListingsService } from '../../listings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, Order_Details, Order_History, Order_Details_History } from '../../shared/models/Order';
import { User } from '../../shared/models/User';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  cart!:Cart;
  cart_items: Cart_Details[] = [];
  wallet!:number;
  user!:User;
  user_id!:string;
  user_id_num!:number;
  orders: Order[] = [];
  order_details: Order_Details[] = [];
  orderHistories: Order_History[] = [];
  order_history_details: Order_Details_History[] = [];

  constructor(
    private cartService: ListingsService,
    private route: ActivatedRoute,
    private router: Router, // Inject Router
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // Retrieve the user ID from the URL
    this.route.paramMap.subscribe(params => {
      this.user_id = params.get('user_id')!;
      this.user_id_num = this.user_id !== null ? parseInt(this.user_id, 10) : 0;
      if (this.user_id) {
        this.cartService.getUserSpecificAccount(this.user_id).subscribe(user => {
          this.user = user;
          this.wallet = user.wallet;
        })

        this.cartService.getUserSpecificCartRoute(this.user_id).subscribe(cart => {
          // console.log("cart: " + cart)
          this.cart = cart;
          console.log("cart: " + this.cart)
          console.log("cart total price: " + this.cart.total_price)
          console.log("cart total quantity: " + this.cart.quantity)

          this.cartService.getUserSpecificCartDetailsRoute(this.user_id).subscribe(cart_items => {
            this.cart_items = cart_items;
            this.cartService.getUserSpecificOrdersRoute(this.user_id_num).subscribe(orders => {
              this.orders = orders;
              this.cartService.getUserSpecificOrderDetailsRoute(this.user_id_num).subscribe(order_details => {
                this.order_details = order_details
                this.cartService.getUserSpecificOrderHistoryRoute(this.user_id_num).subscribe(orderHistories => {
                  this.orderHistories = orderHistories;
                  this.cartService.getUserSpecificOrderHistoryDetailsRoute(this.user_id_num).subscribe(orderHistoryDetails => {
                    this.order_history_details = orderHistoryDetails;
                  })
                })
              })
            })

          });
        })
        // this.cartService.getUserSpecificPendingOrders(this.user_id).subscribe(pending_order => {

        // })
        // this.userService.setUserId(this.user_id);
      }
      // console.log(this.user_id);
    });
    console.log("cart items: " + this.cart_items)
  }

  onDeleteClicked(id: number): void {
    console.log("whats the id: " + id)
    const item = this.cart_items.find(item => item.cart_item_id === id);
    const tempPrice = item?.price;

    console.log("try this out: " + tempPrice)
    this.cartService.deleteCartRoute(id).subscribe(() => {
      // this.restaurants = this.restaurants.filter(
      //   restaurant => restaurant.id.toString() !== id
      // );
      this.cart_items = this.cart_items.filter(
        item => item.cart_item_id !== id
      )
      // console.log("itemid: " + id)
      this.cart.quantity = this.cart.quantity - 1
      this.cart.total_price = this.cart.total_price - tempPrice!

      this.cartService.updateCartByIdRoute(this.user_id, this.cart.quantity, this.cart.total_price).subscribe({
        next: (updatedInfo) => {
          console.log('Update successful', updatedInfo);  
            
        },
        // ownerPage/:user_id/updaterestaurant/:restaurant_id/prompt_update/updatemenu
        error: (updateError) => {
          console.error('Failed to update cart', updateError);
        }
      });
    });
  }

  moveToPendingOrder(): void {
    if (this.cart_items.length != 0){
      console.log("cart_items_length: " + this.cart_items.length)
      if (this.user.wallet - this.cart.total_price > 0) {

        this.cartService.updateWalletByIdRoute(this.user_id_num, this.user.wallet - this.cart.total_price).subscribe(user => {
          this.user = user;
          this.wallet = user.wallet;
          // this.wallet = user.wallet;
          console.log("test wallet: " + this.wallet)
        });

        this.user_id_num = this.user_id !== null ? parseInt(this.user_id, 10) : 0; // Assuming default value of 0 if user_id is null
        this.cartService.addOrderRoute(this.user_id_num, this.cart.total_price).subscribe({
          next: (res) => {
            console.log("order route worked: " + res.order_id)
            this.orders.push(res)
            this.cartService.getUserSpecificCartDetailsRoute(this.user_id).subscribe(cart_items => {
              for (const cartItem of this.cart_items) {
                // Call moveCartToPending for each item
                this.cartService.moveCartToOrders(this.user_id_num, res.order_id, cartItem.name, cartItem.price, cartItem.item_id).subscribe(orders => {
                  console.log("moved to orders succesfully: " + res.order_id);
                    // Optionally, update the UI or do any additional processing
                    // this.cartService.deleteCartRoute(id).subscribe(() => {
                  this.order_details.push(orders)

                  },
                  error => {
                    console.error(`Failed to move cart details to orders: `, error);
                    // Optionally, handle the error or provide user feedback
                  }
                );
              }
              this.cartService.deleteAllUserCartRoute(this.user_id).subscribe(() => {
                this.cartService.updateCartByIdRoute(this.user_id, 0, 0).subscribe(() => {
                  this.cart_items = [];
                  this.cart.total_price = 0;
                  this.cart.quantity = 0;
                })
              })
            });
          },
          error: (err) => {
            console.error('Error adding restaurant: ', err);
          }
        });
      }
      else {
        // console.error('not enough funds')
        alert("Not enough funds!")
      } 
    }
    else {
      alert("Cannot checkout unless you have something in cart!")
    }
  }
}


