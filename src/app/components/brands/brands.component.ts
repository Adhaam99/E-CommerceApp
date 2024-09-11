import { Component, OnDestroy, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Brands } from '../../core/interfaces/brands';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit, OnDestroy {
  allBrands: Brands[] = [];
  getAllBrands!: Subscription;

  constructor(private _BrandsService: BrandsService) {}

  getBrands = (): void => {
    this.getAllBrands = this._BrandsService.getBrands().subscribe({
      next: (res) => {
        this.allBrands = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  ngOnInit(): void {
    this.getBrands();
  }

  ngOnDestroy(): void {
    this.getAllBrands?.unsubscribe();
  }
}
