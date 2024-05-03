export class Menu {
    item_id!: number;
    name!: string;
    id!: number;
    price!: number;
    itemDetails?: {
        name: string;
        price: number;
    }; // Assuming itemDetails is a nested object within Menu thats responsible to show the name and price on update page.
}
