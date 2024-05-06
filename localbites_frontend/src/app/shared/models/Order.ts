export class Order {
    order_id!: number;
    user_id!: number;
    total_price!: number;
    items?: Order_Details[];
}

export class Order_Details {
    order_id!: number;
    order_item!: number;
    item_id!: number;
    name!: string;
    price!: number;
    user_id!: number;
  }