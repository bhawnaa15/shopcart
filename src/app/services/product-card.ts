export interface IProductCard {
    title: string; 
    description: string; 
    price: string; 
    rating: { rate: number, count:number};
    id? : number;
    category? : string;
    image: string;
    isLiked: boolean;
}
