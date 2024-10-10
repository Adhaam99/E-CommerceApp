import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/product';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { Categories } from '../../core/interfaces/categories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from "../../shared/product/product.component";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselModule,
    RouterLink,
    FormsModule,
    NgClass,
    ProductComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  allProducts: Product[] = [];
  allCategories:WritableSignal<Categories[]> = signal([])
  getAllProducts!: Subscription;
  getAllCategories!: Subscription;

  private readonly _ProductsService = inject(ProductsService);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _NgxSpinnerService = inject(NgxSpinnerService);


  customOptionsMain: OwlOptions = {
    rtl:true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplaySpeed: 1500,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 1000,
    navText: ['', ''],
    items: 1,
    nav: true,
  };

  customOptionsCat: OwlOptions = {
    rtl:true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplaySpeed: 1500,
    autoplayHoverPause: true,
    margin: 12,
    dots: true,
    navSpeed: 1000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: false,
  };

  getProduct = () => {
    this.getAllProducts = this._ProductsService.getProducts().subscribe({
      next: (res) => {
        this.allProducts = res.data;
      },

      error: (err) => {
        console.log(err);
      },
    });
  };

  getCategories = () => {
    this.getAllCategories = this._CategoriesService.getCategories().subscribe({
      next: (res) => {
        this.allCategories.set(res.data);
      },

      error: (err) => {
        console.log(err);
      },

    });
  };

 

  ngOnInit(): void {
    this.getProduct();
    this.getCategories();
  }

  ngOnDestroy(): void {
    this.getAllProducts?.unsubscribe();
    this.getAllCategories?.unsubscribe();
  }
}
