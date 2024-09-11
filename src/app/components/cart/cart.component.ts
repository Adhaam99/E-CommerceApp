import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ICart } from '../../core/interfaces/icart';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, OnDestroy {
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);

  cartData: ICart | null = null;
  clearMsg: string = '';
  isLoading: boolean = true;

  getUserCartApi!: Subscription;
  removeCartItemApi!: Subscription;
  updateCountApi!: Subscription;
  clearCartApi!: Subscription;

  getUserCart = () => {
    this.getUserCartApi = this._CartService.getUserCart().subscribe({
      next: (res) => {
        if(res.data.totalCartPrice!== 0){
          this.cartData = res.data;
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  };

  removeCartItem = (id: string) => {
    this.removeCartItemApi = this._CartService.removeCartItem(id).subscribe({
      next: (res) => {
        this.cartData = res.data;
        this._CartService.cartCounter.next(res.numOfCartItems);
        this._ToastrService.success('Item Removed Successfully');
      },
    });
  };

  updateCount = (id: string, newCount: number) => {
    this.updateCountApi = this._CartService
      .updateCartProductQTY(id, newCount)
      .subscribe({
        next: (res) => {
          this.cartData = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  };

  clearCart = () => {
    this.clearCartApi = this._CartService.clearCart().subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
        this._CartService.cartCounter.next(0);
        this.cartData = null;
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  ngOnInit(): void {
    this.getUserCart();
  }

  ngOnDestroy(): void {
    this.getUserCartApi?.unsubscribe();
    this.removeCartItemApi?.unsubscribe();
    this.updateCountApi?.unsubscribe();
    this.clearCartApi?.unsubscribe();
  }
}
