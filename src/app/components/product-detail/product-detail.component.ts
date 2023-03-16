import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { IProductCard } from 'src/app/services/product-card';
import { addProduct } from 'src/app/store/actions';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit{
    public product;
    public productId;
    public allProducts: IProductCard[] = [];

    constructor(private activatedRoute:ActivatedRoute, private store:Store, private http: HttpClient){
    }
    ngOnInit(){
      this.productId=this.activatedRoute.snapshot.paramMap.get('id')
      this.http.get('https://fakestoreapi.com/products')
      .pipe(map((product) => {
        const products: any[] = [];
        for (const key in product) {
          products.push({ ...product[key], id: key, isLiked: false })
        }
        return products;
      }))
      .subscribe((products) => {
        this.product=products.find((item)=>item.id===this.productId)
        console.log(this.product)
      })
    }
    private selectItemAlert(message: any) {
      Swal.fire({
        position: 'top-end',
        html: message,
        timer: 2000,
        width: '500px',
        showConfirmButton: false,
        timerProgressBar: false,
      });
    }
    private itemAddedAlert(message: any) {
      Swal.fire({
        position: 'top-end',
        html: message,
        timer: 800,
        width: '300px',
        showConfirmButton: false,
        timerProgressBar: true,
      });
    }

    cartStatus:string="";
    viewCart(product:IProductCard) {
      this.cartStatus=sessionStorage.getItem('login');
        if(this.cartStatus === "true"){
          this.store.dispatch(addProduct(product));
          this.itemAddedAlert("Item Added");
        }
        else{
          this.selectItemAlert("Please Login first");
        }
      }
}
