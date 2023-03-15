import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './homepage/homepage.component';
import { CartComponent } from './components/cart/cart.component';
import { StoreModule } from '@ngrx/store';
import { cartReducer, metaReducerLocalStorage } from './store/reducers';
import { AlertModule } from 'ngx-bootstrap/alert';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignInComponent,
    ProductCardComponent,
    NavbarComponent,
    HomepageComponent,
    CartComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule,
    StoreModule.forRoot({ cartEntries: cartReducer }, { metaReducers: [ metaReducerLocalStorage ] }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
