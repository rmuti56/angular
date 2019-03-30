import { Injectable } from '@angular/core';
import lang from '../../assets/language.json';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() { }

  language() {
    return lang;
  }
}
