import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Categories } from '../../core/interfaces/categories';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit, OnDestroy {
  allCategories: Categories[] = [];
  getAllCategories!: Subscription;
  constructor(private _CategoriesService: CategoriesService) {}

  getCategories = () => {
   this.getAllCategories= this._CategoriesService.getCategories().subscribe({
      next: (res) => {
        this.allCategories = res.data;
      },

      error: (err) => {
        console.log(err);
      },
    });
  };

  ngOnInit(): void {
    this.getCategories();
  }

  ngOnDestroy(): void {
    this.getAllCategories?.unsubscribe()
  }
}
