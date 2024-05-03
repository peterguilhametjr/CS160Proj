export class Restaurant{
    id!:number;
    name!:string;
    tags?:string[];
    stars:number = 0;
    imageURL!:string;
    location!:string;
    zip_code!:string;
}

// export class Restaurant_owner{ // idont think i have used it anywhere after fixing post request but am not deleting it until i zip it first.
//     name!:string;
//     tags?:string[];
//     stars!:number;
//     imageURL!:string;
//     location!:string;
// }