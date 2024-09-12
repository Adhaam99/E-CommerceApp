import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { initFlowbite } from 'flowbite';
import { MyTranslateService } from '../../core/services/my-translate.service';

@Component({
  selector: 'app-navbar-auth',
  standalone: true,
  imports: [RouterLink,RouterLinkActive ,TranslateModule],
  templateUrl: './navbar-auth.component.html',
  styleUrl: './navbar-auth.component.scss'
})
export class NavbarAuthComponent implements OnInit {

  private readonly _MyTranslateService = inject(MyTranslateService);
  readonly _TranslateService = inject(TranslateService);

  change = (lang: string) => {
    this._MyTranslateService.changeLang(lang);
  };

  ngOnInit(): void {
    
    initFlowbite();
  }
}
