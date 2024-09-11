import { Component, inject, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { registerVaildators } from '../../shared/utilites/registerVaildators.utilites';
import { NgClass } from '@angular/common';
import { AlertErrorComponent } from '../../shared/alert-error/alert-error.component';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, AlertErrorComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent implements OnDestroy{
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);

  verifyEmailApi!: Subscription;
  verifyCodeApi!: Subscription;
  resetPasswordApi!: Subscription;

  step: number = 1;

  errorMsg: string = '';
  isLoading: boolean = false;

  verifyEmail: FormGroup = this._FormBuilder.group({
    email: [null, registerVaildators.email],
  });

  verifyCode: FormGroup = this._FormBuilder.group({
    resetCode: [null, [Validators.required,Validators.pattern(/^[0-9]{6}$/)]],
  });

  resetPassword: FormGroup = this._FormBuilder.group({
    email: [null, registerVaildators.email],
    newPassword: [null, registerVaildators.password],
  });

  verifyEmailSubmit(): void {
    this.isLoading = true;
    this.verifyEmailApi = this._AuthService
      .setEmailVerify(this.verifyEmail.value)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          console.log(res);
          if (res.statusMsg === 'success') {
            this.step = 2;
            this.errorMsg = '';
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMsg = 'Failed';
          console.log(err);
        },
      });
  }

  verifyCodeSubmit(): void {
    this.isLoading = true;
    this.verifyCodeApi = this._AuthService
      .setCodeVerify(this.verifyCode.value)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          console.log(res);
          if (res.status === 'Success') {
            this.step = 3;
            this.errorMsg = '';
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMsg = 'Failed';
          console.log(err);
        },
      });
  }

  resetPasswordSubmit(): void {
    this.isLoading = true;
    this.resetPasswordApi = this._AuthService
      .setNewPassword(this.resetPassword.value)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          console.log(res);
          this.errorMsg = '';
          localStorage.setItem('userToken', res.token);
          this._AuthService.saveUserData()
          this._Router.navigate(['/home']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMsg = 'Failed';
          console.log(err);
        },
      });
  }

  ngOnDestroy(): void {
    this.verifyEmailApi?.unsubscribe()
    this.verifyCodeApi?.unsubscribe()
    this.resetPasswordApi?.unsubscribe()
  }
}
