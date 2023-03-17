export interface IProductCard {
    title: string; 
    description: string; 
    price: number; 
    rating: { rate: number, count:number};
    id? : number;
    category? : string;
    image: string;
    isLiked: boolean;
    total?:number;
    quantity?:number;
}
export interface ILoginForm {
    username: string; 
    password: string; 
}
export interface ISigninForm {
    email: string; 
    password: string;
    firstName:string; 
    lastName:string; 
}
