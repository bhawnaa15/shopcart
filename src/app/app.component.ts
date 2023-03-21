import { Component, OnInit } from '@angular/core';
import { TranslationService } from './services/translation.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'shopcart';
  constructor( private translateService: TranslationService) {
    console.log(translateService.data);
  }
  ngOnInit(){ }
}
