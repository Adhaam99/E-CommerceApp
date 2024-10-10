import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ProductDetails } from '../../core/interfaces/product-details';
import { CartService } from '../../core/services/cart.service';
import { ProductsService } from '../../core/services/products.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule , CurrencyPipe ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  addProductToCartApi!:Subscription;

  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  private readonly  _CartService = inject(CartService)
  private readonly  _ToastrService = inject(ToastrService)


  productIdSub!: Subscription;
  productDetails: ProductDetails | null = null;

  customOptionsImg: OwlOptions = {
    rtl:true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:3000,
    autoplaySpeed:1000,
    autoplayHoverPause:true,
    margin:12,
    dots: true,
    navSpeed: 2000,
    navText: ['', ''],
    items:1,
    nav: false
  }

  getProductId(): void {
    this.productIdSub = this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        let ProductId = p.get('id');

        this._ProductsService.getSpecificProduct(ProductId).subscribe({
          next: (res) => {
            this.productDetails = res.data
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addProductToCart = (id: string) => {
    this.addProductToCartApi = this._CartService.addToCart(id).subscribe({
      next: (res) => {
        this._CartService.cartCounter.set(res.numOfCartItems);
        this._ToastrService.success('Product Added Successfully');
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  ngOnInit(): void {
    this.getProductId();
  }

  ngOnDestroy(): void {
    this.productIdSub?.unsubscribe();
    this.addProductToCartApi?.unsubscribe();
  }
}
