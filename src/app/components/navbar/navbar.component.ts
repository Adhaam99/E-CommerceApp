import {
  AfterViewInit,
  Component,
  computed,
  inject,
  NgZone,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { WishlistService } from '../../core/services/wishlist.service';
import { NgClass, UpperCasePipe } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/my-translate.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, NgClass,UpperCasePipe ,TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  cartCounter = computed( () => this._CartService.cartCounter() )
  wishlistCounter: number = 0;
  getUserCartApi!: Subscription;
  getCartCounterApi!: Subscription;
  getUserWishlistApi!: Subscription;
  wishlistCounterApi!: Subscription;

  readonly _AuthService = inject(AuthService);
  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);
  private readonly _MyTranslateService = inject(MyTranslateService);
  readonly _TranslateService = inject(TranslateService);

  getUserCart = () => {
    this.getUserCartApi = this._CartService.getUserCart().subscribe({
      next: (res) => {
        this._CartService.cartCounter.set(res.numOfCartItems) ;
      },
    });
  };

  getUserWishlist = () => {
    this.wishlistCounterApi = this._WishlistService.wishListCounter.subscribe({
      next: (counter) => {
        this.wishlistCounter = counter;
      },
    });
    this.getUserWishlistApi = this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        this.wishlistCounter = res.data.length;
      },
    });
  };

  change = (lang: string) => {
    this._MyTranslateService.changeLang(lang);
  };

  ngOnInit(): void {
    initFlowbite();
    this.getUserCart();
    this.getUserWishlist();
  }

  ngOnDestroy(): void {
    this.getUserCartApi?.unsubscribe();
    this.getCartCounterApi?.unsubscribe();
    this.getUserWishlistApi?.unsubscribe();
    this.wishlistCounterApi?.unsubscribe();
  }
}
