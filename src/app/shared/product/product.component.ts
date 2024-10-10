import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IWishProduct } from '../../core/interfaces/iwish-product';
import { OnSalePipe } from '../../core/pipes/on-sale.pipe';
import { TrimTextPipe } from '../../core/pipes/trim-text.pipe';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { Product } from '../../core/interfaces/product';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink, UpperCasePipe, CurrencyPipe, TrimTextPipe, OnSalePipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input() allProducts: Product[] = [];
  wishListIcon: string[] = [];
  addProductToCartApi!: Subscription;
  addToWishlistApi!: Subscription;
  getUserWishlistApi!: Subscription;
  removeFromWishlistApi!: Subscription;

  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _WishlistService = inject(WishlistService);

  addProductToCart = (id: string) => {
    this._WishlistService.removeFromWishlist(id).subscribe({
      next: (res) => {
        this.wishListIcon = res.data;
        this._WishlistService.wishListCounter.next(res.data.length);
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.addProductToCartApi = this._CartService.addToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this._CartService.cartCounter.set(res.numOfCartItems);
        this._ToastrService.success('Product Added Successfully' , 'FreshCart');
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  addToWishlist = (event: MouseEvent, id: string) => {
    event.stopPropagation();
    this.addToWishlistApi = this._WishlistService.addToWishlist(id).subscribe({
      next: (res) => {
        this.wishListIcon = res.data;
        this._WishlistService.wishListCounter.next(res.data.length);
        this._ToastrService.success('Product Added to Wishlist' , 'FreshCart');
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  removeFromWishlist = (event: MouseEvent, id: string) => {
    event.stopPropagation();
    this.removeFromWishlistApi = this._WishlistService
      .removeFromWishlist(id)
      .subscribe({
        next: (res) => {
          this.wishListIcon = res.data;
          this._WishlistService.wishListCounter.next(res.data.length);
          this._ToastrService.success('Product Removed From Wishlist' , 'FreshCart');
        },
        error: (err) => {
          console.log(err);
        },
      });
  };

  getUserWishlist = () => {
    this.getUserWishlistApi = this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        this.wishListIcon = res.data.map((p: any) => {
          return p.id;
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  ngOnInit(): void {
    this.getUserWishlist();
  }

  ngOnDestroy(): void {
    this.addProductToCartApi?.unsubscribe();
    this.getUserWishlistApi?.unsubscribe();
    this.addToWishlistApi?.unsubscribe();
    this.removeFromWishlistApi?.unsubscribe();
  }
}
