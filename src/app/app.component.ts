import { Component } from '@angular/core';
import { TranslationService } from './core/Translate/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PulpoLine-test';
  showDropdown = false;
  currentLang = 'en';

  constructor(public translationService: TranslationService) {
    this.currentLang = localStorage.getItem('language') || 'en';
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  switchLanguage(lang: string): void {
    this.currentLang = lang;
    this.translationService.useLanguage(lang);
    this.showDropdown = false;
  }
}
