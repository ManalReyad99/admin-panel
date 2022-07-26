import { IColor } from "./icolor";
import { ISize } from "./isize";

export interface IProduct {

    id:number;
    name:string;
    quantity:number;
    price:number;
    image:string;
    categoryid:number;
     description:string;
    hasDiscount:boolean;
     priceAfterDiscount:number;
     colors:any;
     sizes:any;
}
