import { isPlatformBrowser } from '@angular/common';
import {
  inject,
  Injectable,
  PLATFORM_ID,
  RendererFactory2,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class MyTranslateService {
  private readonly _platId = inject(PLATFORM_ID);
  private readonly _Renderer2 = inject(RendererFactory2).createRenderer(
    null,
    null
  );

  constructor(private _TranslateService: TranslateService) {
    if (isPlatformBrowser(this._platId)) {
      this._TranslateService.setDefaultLang('en');
      this.setLang();
    }
  }

  setLang = () => {
    let savedLang = localStorage.getItem('lang');

    if (savedLang !== null) {
      this._TranslateService.use(savedLang);
    }

    if (savedLang == 'en') {
      this._Renderer2.setAttribute(document.documentElement, 'dir', 'ltr');
      this._Renderer2.setAttribute(document.documentElement, 'lang', 'en');
    } else if (savedLang == 'ar') {
      this._Renderer2.setAttribute(document.documentElement, 'dir', 'rtl');
      this._Renderer2.setAttribute(document.documentElement, 'lang', 'ar');
    }
  };

  changeLang = (lang: string) => {
    if (isPlatformBrowser(this._platId)) {
      localStorage.setItem('lang', lang);
      this.setLang();
    }
  };
}
