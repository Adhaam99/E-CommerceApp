import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/product';
import { Subscription } from 'rxjs';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { ProductComponent } from "../../shared/product/product.component";


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnDestroy {
  allProducts: Product[] = [];
  getProductApi!:Subscription;
  
  private readonly  _ProductsService = inject(ProductsService)

  getProduct = () => {
   this.getProductApi = this._ProductsService.getProducts().subscribe({
      next: (res) => {
        this.allProducts = res.data;
      },

      error: (err) => {
        console.log(err);
      },

      complete: () => {
        console.log('complete');
      },
    });
  };

  ngOnInit(): void {
    this.getProduct();
  }

  ngOnDestroy(): void {
    this.getProductApi?.unsubscribe()
  }
};
