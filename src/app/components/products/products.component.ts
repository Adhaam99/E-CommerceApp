import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../core/interfaces/product';
import { ProductsService } from '../../core/services/products.service';
import { ProductComponent } from "../../shared/product/product.component";
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductComponent, FormsModule, SearchPipe, TranslateModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnDestroy {
  allProducts: Product[] = [];
  getProductApi!:Subscription;
  word:string = '';
  
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
