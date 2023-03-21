import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private hindiUrl = '../assets/i18n/hi.json';
  private englishUrl = '../assets/i18n/en.json';
  public currentLanguage = 'english'

  constructor(private http: HttpClient) {
  }

  data: any = {}
  public getJSON(): Promise<{}> {
    if (this.currentLanguage === 'hindi') {
      return new Promise<{}>(resolve => {
        this.http.get(this.hindiUrl).subscribe(
          res => {
            this.data = res || {};
            resolve(this.data);
          })
      })
    }
    else {
      return new Promise<{}>(resolve => {
        this.http.get(this.englishUrl).subscribe(
          res => {
            this.data = res || {};
            resolve(this.data);
          })
      })
    }
  }
}