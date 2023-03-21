import { APP_INITIALIZER, NgModule } from '@angular/core';
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
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import{ SearchFilterPipe} from 'src/app/pipes/filter.pipe';
import { HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { TranslatePipe } from './pipes/translate.pipe';
import { TranslationService } from './services/translation.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignInComponent,
    ProductCardComponent, 
    NavbarComponent,
    HomepageComponent,
    CartComponent,
    FooterComponent,
    ProductDetailComponent,
    SearchFilterPipe,
    TranslatePipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule,
    StoreModule.forRoot({ cartEntries: cartReducer }, { metaReducers: [ metaReducerLocalStorage ] }),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  providers: [
    TranslationService,
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateServiceFactory,
      deps: [
        TranslationService
      ],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function setupTranslateServiceFactory(
  service: TranslationService): Function {
return () => service.getJSON();
}
