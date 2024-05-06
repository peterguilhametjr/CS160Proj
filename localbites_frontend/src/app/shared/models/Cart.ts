export class Cart {
    user_id!: number;
    quantity!: number;
    total_price!: number;
}


export class Cart_Details {
    cart_item_id!: number;
    user_id!: number;
    item_id!: number;
    name!: string;
    price!: number;
  }