import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductComponent } from "../../shared/product/product.component";
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../core/interfaces/product';
import { CategoriesService } from '../../core/services/categories.service';
import { BrandsService } from '../../core/services/brands.service';

@Component({
  selector: 'app-sub-brand',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './sub-brand.component.html',
  styleUrl: './sub-brand.component.scss'
})
export class SubBrandComponent implements OnInit , OnDestroy {

  allProducts: Product[] = [];
  getBrandIdApi!: Subscription;

  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _BrandsService = inject(BrandsService);

  getBrandId = () => {
    this.getBrandIdApi = this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        let brandId = p.get('id');

        this._BrandsService.getSpecificBrand(brandId).subscribe({
          next: (res) => {
            this.allProducts = res.data;
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
    });
  };

  ngOnInit(): void {
    this.getBrandId();
  }

  ngOnDestroy(): void {
    this.getBrandIdApi?.unsubscribe;
  }
}
