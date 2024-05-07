import { Injectable } from '@angular/core';
//import { RestaurantsService } from './services/restaurants/restaurants.service'; 

import { Restaurant } from './shared/models/Restaurant';
import { Offer } from './shared/models/Offer';
import { Menu } from './shared/models/Menu';
import { User } from './shared/models/User';
import { Cart, Cart_Details } from './shared/models/Cart';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Order, Order_Details } from './shared/models/Order';


@Injectable({
  providedIn: 'root'
})
export class ListingsService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  restaurants: Restaurant[] = []; 
  Offers: Offer[] = [];
  Menu: Menu[] = [];
  Users: User[] =[]; 
  Cart: Cart[] = [];
  Cart_Details: Cart_Details[] = [];
  Order: Order[] = [];
  Order_Details: Order_Details[] = [];
  User!:User;
  
  getAll: any;
  updateRestaurant: any;

  constructor(    private http: HttpClient,
  ) { }

//done
  UserSignupRoute(name: string, email: string, zip_code: string, password: string): Observable<User> {
    const body = { name, email, zip_code, password };
    return this.http.post<User>('/api/userSignup', body);
  }


  getUserIdRoute(name: string, email: string, zip_code: string, password: string): Observable<User> {
    return this.http.get<User>(`/api/userid/${name}/${email}/${zip_code}/${password}`);
  }

  cartInitializeRoute(user_id: number, quantity: number, total_price: number): Observable<Cart> {
    const body = { user_id, quantity, total_price}
    return this.http.post<Cart>('/api/user/cart/', body);
  }


  RestaurantUserSignupRoute(name: string, email: string, password: string): Observable<User> {
    const body = { name, email, password };
    return this.http.post<User>('/api/restaurant/userSignup', body);
  }

  addToCartRoute(user_id: number, item_id: number, name: string, price: number): Observable<Cart> {
    const body = { user_id, item_id, name, price }
    return this.http.post<Cart>('/api/user/cart/addToCart', body);
    // api/user/cart/addToCart
  }


  UserLoginRoute(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>('/api/users/login', body);
  }
 
  RestaurantUserLoginRoute(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>('/api/restaurant/login', body);
  }

  getUserSpecificRestaurantRoute(user_id: string): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`/api/ownerPage/${user_id}`);
  }

  getUserSpecificOrdersRoute(user_id: number): Observable<Order[]> {
    return this.http.get<Order[]>(`/api/userPage/${user_id}/getOrdersRoute`)
  }

  getUserSpecificOrderDetailsRoute(user_id: number): Observable<Order_Details[]> {
    return this.http.get<Order_Details[]>(`/api/userPage/${user_id}/getOrderDetailsRoute`)
  }

  getAllRestaurantsRoute(): Observable<Restaurant[]> { //done
    return this.http.get<Restaurant[]>('/api/searchPage');
  }

  getAllOffersRoute(): Observable<Offer[]> { //done
    return this.http.get<Offer[]>('/api/offersPage');
  }
  getUserRestaurantsByIdRoute(id: string): Observable<Restaurant> { //done no need for [] cuz we only using one column that's id only.
    return this.http.get<Restaurant>(`/api/restaurant/${id}`);
  }

  // getMenuItemsRoute(): Observable<
  
  //done
  getUserRestaurantsMenuRoute(id: string): Observable<Menu[]> {
    return this.http.get<Menu[]>(`/api/restaurant/${id}/menu`);
  }  

  getUserSpecificCartDetailsRoute(user_id: string): Observable<Cart_Details[]> {
    return this.http.get<Cart_Details[]>(`/api/user/cartDetails/${user_id}`)
  }

  getUserSpecificCartRoute(user_id: string): Observable<Cart> {
    return this.http.get<Cart>(`/api/user/getCart/${user_id}`)
  }

  getUserSpecificAccount(user_id: string): Observable<User> {
    return this.http.get<User>(`/api/userPage/${user_id}/getAccount`)
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`/api/driverPage/getAllOrders`)
  }

  // done when using post request will need to enter all the columns of table
  updateRestaurantRoute(id: string, name: string, location: string, tags: string[], imageURL: string, zip_code: string): Observable<Restaurant> {
    const body = { name, location, tags, imageURL, zip_code }; //means we only need to update all these cuz remember id is auto increment, so can't update id
    return this.http.post<Restaurant>(`/api/ownerpage/updaterestaurant/${id}`, body, this.httpOptions);
  }

  updateWalletByIdRoute(user_id: number, newAmount: number): Observable<User> {
    const body = { user_id, newAmount };
    return this.http.post<User>(`/api/userPage/updateWalletById`, body, this.httpOptions);
  }

  //done same reasonning as above no need for id in this we are not using id in url
  addRestaurantRoute(name: string, location: string, tags: string[], imageURL: string, zip_code: string, user_id: number): Observable<Restaurant> {
    const body = { name, location, tags, imageURL, zip_code, user_id };
    return this.http.post<Restaurant>(`/api/ownerpage/addrestaurant`, body, this.httpOptions);
  }

  // res.order_id, cartItem.name, cartItem.price

  moveCartToOrders(user_id: number, order_id: number, name: string, price: number, item_id: number): Observable<Order_Details> {
    const body = { user_id, order_id, name, price, item_id }
    return this.http.post<Order_Details>(`/api/userPage/moveToOrder`, body, this.httpOptions)
  }

  addOrderRoute(user_id: number, total_price: number): Observable<Order> {
    const body = { user_id, total_price };
    return this.http.post<Order>(`/api/userPage/cartToOrder`, body, this.httpOptions);
  }

  getRestaurantIdRoute(user_id: number, name: string, location: string): Observable<number> {
    return this.http.get<number>(`/api/${user_id}/${name}/${location}/getrestaurantid`, this.httpOptions);
  }

  getCartQuantityByIdRoute(user_id: string): Observable<number> {
    return this.http.get<number>(`/api/${user_id}/getCartQuantity`, this.httpOptions)
  }

  getCartSumByIdRoute(user_id: string): Observable<number> {
    return this.http.get<number>(`/api/${user_id}/getCartTotalPrice`, this.httpOptions)
  }

  
  //done we are using id in url so need id to read url
  deleteRestaurantRoute(id: string): Observable<any> {
    return this.http.delete(`/api/ownerpage/${id}`);
  }

  deleteAllUserCartRoute(user_id: string): Observable<any> {
    return this.http.delete(`/api/userPage/${user_id}/deleteAllFromCart`)
  }

  deleteCartRoute(cart_item_id: number): Observable<any> {
    return this.http.delete(`/api/user/cartDelete/${cart_item_id}`)
  }

  fullfilOrder(order_id: number): Observable<any> {
    return this.http.delete(`/api/driverPage/fullfilOrder/${order_id}`)
  }
  
  // done
  getRestaurantsMenuRoute(id: string): Observable<Menu[]> {
    return this.http.get<Menu[]>(`/api/ownerpage/menu/${id}`);
  }


  //done 
  updateMenuRoute(id: string, item_id: string, name: string, price: number): Observable<Menu> {
    const body = { name, price }; //same reasoning only update varaibles are needed to update
    return this.http.post<Menu>(`/api/ownerpage/menu/${id}/update/${item_id}`, body, this.httpOptions);
  }

  updateCartByIdRoute(user_id: string, quantity: number, total_price: number): Observable<Cart> {
    const body = { user_id, quantity, total_price};
    return this.http.post<Cart>(`/api/cart/updateCartTotalPrice`, body, this.httpOptions);
  }


  //done
  getItemRoute(id: string, item_id: string): Observable<Menu> {
    return this.http.get<Menu>(`/api/ownerpage/menu/${id}/update/${item_id}`);
  }

  // wokrking with only restaurants not menu, maybe cuz of itemsdetails  ----- done
  addMenuRoute(user_id: string, id: string, name: string, price: number): Observable<Restaurant> {
    const body = { name, price }; // Removed 'Number' as it seems unnecessary
    return this.http.post<Restaurant>(`/api/ownerpage/addrestaurant/${id}/menuadd`, body, this.httpOptions);
  }
  // /api/ownerpage/{user_id}/addrestaurant/{restaurant_id}/prompt_add/addmenu
  // {path:'ownerPage/:user_id/addrestaurant/:restaurant_id/prompt_add/addmenu', component:AddMenuComponent},

  
  //done
  deleteMenuRoute(id: string, item_id: string): Observable<any> {
    return this.http.delete(`/api/ownerpage/menu/${id}/${item_id}`);
  }

  // initializeCartRoute(){

  // }

  // addToCartRoute(id: string): Observable<Restaurant> {
  //   return this.http.post<Restaurant>(`/api/`)
  // }
  
}
