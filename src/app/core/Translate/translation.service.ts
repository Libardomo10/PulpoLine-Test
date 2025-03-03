import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  constructor(private translate: TranslateService) {
    // Configurar los idiomas disponibles
    this.translate.addLangs(['en', 'es']);
    this.translate.setDefaultLang('en');

    // Obtener el idioma guardado en localStorage o el del navegador
    const browserLang = localStorage.getItem('language') || translate.getBrowserLang();
    this.useLanguage(browserLang?.match(/en|es/) ? browserLang : 'en');
  }

  useLanguage(lang: string) {
    localStorage.setItem('language', lang);
    this.translate.use(lang);
  }

  get currentLanguage(): string {
    return this.translate.currentLang;
  }
}
