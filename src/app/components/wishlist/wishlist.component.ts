import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { Subscription } from 'rxjs';
import { IWishProduct } from '../../core/interfaces/iwish-product';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit, OnDestroy {
  wishlistData: IWishProduct[] = [];
  isLoading: boolean = true;
  getUserWishlistApi!: Subscription;
  removeFromWishlistApi!: Subscription;
  addProductToCartApi!: Subscription;

  private readonly _WishlistService = inject(WishlistService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);

  getUserWishlist = () => {
    this.getUserWishlistApi = this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.wishlistData = res.data;
        this._WishlistService.wishListCounter.next(res.data.length)
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      },
    });
  };

  removeFromWishlist = (id: string) => {
    this.removeFromWishlistApi = this._WishlistService
      .removeFromWishlist(id)
      .subscribe({
        next: (res) => {
          this.getUserWishlist();
          this._ToastrService.success('Product Removed from Wishlist');
        },
        error: (err) => {
          console.log(err);
        },
      });
  };

  addProductToCart = (id: string) => {
    this.addProductToCartApi = this._CartService.addToCart(id).subscribe({
      next: (res) => {
        this.getUserWishlist();
        this._CartService.cartCounter.next(res.numOfCartItems)
        this._ToastrService.success('Product Added to Cart');
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
    this.getUserWishlistApi?.unsubscribe();
    this.removeFromWishlistApi?.unsubscribe();
    this.addProductToCartApi?.unsubscribe();
  }
}
