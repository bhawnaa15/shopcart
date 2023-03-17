import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch:"full"},
  {path: 'login', component : LoginComponent},
  {path: 'signin', component : SignInComponent},
  {path: 'home', component : HomepageComponent},
  {path: 'add-to-cart', component : CartComponent},
  {path: 'home/product/:id', component : ProductDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
