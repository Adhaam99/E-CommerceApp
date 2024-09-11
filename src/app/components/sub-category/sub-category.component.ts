import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../core/services/categories.service';
import { Subscription } from 'rxjs';
import { Product } from '../../core/interfaces/product';
import { ProductComponent } from "../../shared/product/product.component";

@Component({
  selector: 'app-sub-category',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './sub-category.component.html',
  styleUrl: './sub-category.component.scss',
})
export class SubCategoryComponent implements OnInit, OnDestroy {
  allProducts: Product[] = [];
  getCatIdApi!: Subscription;

  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _CategoriesService = inject(CategoriesService);

  getCatId = () => {
    this.getCatIdApi = this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        let catId = p.get('id');

        this._CategoriesService.getSpecificCategorey(catId).subscribe({
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
    this.getCatId();
  }

  ngOnDestroy(): void {
    this.getCatIdApi?.unsubscribe;
  }
}
