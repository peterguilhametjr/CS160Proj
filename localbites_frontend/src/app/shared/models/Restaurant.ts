export class Restaurant{
    id!:number;
    name!:string;
    tags?:string[];
    stars:number = 0;
    imageURL!:string;
    location!:string;
    zip_code!:string;
    items?: Item[];  // Include an array of Menu items
}



export class Item {
  item_id!: number;
  name!: string;
  price!: number;
}