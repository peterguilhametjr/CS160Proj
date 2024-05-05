export class Cart {
    user_id!: number;
    quantity!: number;
    total_price!: number;
    items?: Cart_Details[];
}


export class Cart_Details {
    cart_item_id!: number;
    item_id!: number;
    name!: string;
    price!: number;
  }