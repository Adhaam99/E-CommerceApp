import { NgClass } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertErrorComponent } from '../../shared/alert-error/alert-error.component';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, AlertErrorComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit, OnDestroy {
  errorMsg = '';
  cartId: string | null = '';
  isLoading: boolean = false;

  getCartIdApi!: Subscription;
  shippingDataApi!: Subscription;

  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _OrdersService = inject(OrdersService);

  shippingAddress: FormGroup = this._FormBuilder.group({
    details: [null, Validators.required],
    phone: [
      null,
      [Validators.required, Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)],
    ],
    city: [null, [Validators.required, Validators.pattern(/^\w{3,15}$/)]],
  });

  shipingData = () => {
    this.isLoading = true;
    this.shippingDataApi = this._OrdersService
      .checkOut(this.cartId, this.shippingAddress.value)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          console.log(res);
          if (res.status === 'success') {
            window.open(res.session.url , '_self');
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
        },
      });
  };

  getCartId = () => {
    this.getCartIdApi = this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        this.cartId = p.get('id');
      },
    });
  };
  shipingAddress: any;

  ngOnInit(): void {
    this.getCartId();
  }

  ngOnDestroy(): void {
    this.getCartIdApi?.unsubscribe();
    this.shippingDataApi?.unsubscribe();
  }
}
