import { Component, inject, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { registerVaildators } from '../../shared/utilites/registerVaildators.utilites';
import { NgClass } from '@angular/common';
import { AlertErrorComponent } from '../../shared/alert-error/alert-error.component';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule, NgClass, AlertErrorComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  isLoading: boolean = false;
  errorMsg: string = '';
  loginApi!: Subscription;

  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);

  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, registerVaildators.email],
    password: [null, registerVaildators.password],
  });

  loginData(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;

      this.loginApi = this._AuthService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            localStorage.setItem('userToken', res.token);

            this._AuthService.saveUserData();

            console.log(this._AuthService.userData);

            this._Router.navigate(['/home']);
          }

          this.isLoading = false;
          console.log(res);
        },

        error: (err) => {
          this.isLoading = false;
          this.errorMsg = err.error.message;
          console.log(err);
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.loginApi?.unsubscribe()
  }
}
