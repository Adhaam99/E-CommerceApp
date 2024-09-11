import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { AlertErrorComponent } from '../../shared/alert-error/alert-error.component';
import { confirmPassword } from '../../shared/utilites/confirm-pass.utilites';
import { registerVaildators } from '../../shared/utilites/registerVaildators.utilites';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, AlertErrorComponent, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnDestroy {
  errorMsg: string = '';
  successMsg: string = '';
  isLoading: boolean = false;
  registerApi!:Subscription;

  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);

  registerForm: FormGroup = this._FormBuilder.group(
    {
      name: [null, registerVaildators.name],
      email: [null, registerVaildators.email],
      password: [null, registerVaildators.password],
      rePassword: [null],
    },
    { validators: confirmPassword }
  );

  /*
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, registerVaildators.name),
    email: new FormControl(null, registerVaildators.email),
    password: new FormControl(null, registerVaildators.password),
    rePassword: new FormControl(null),
  }, cofirmPassword);
*/
  registerData(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;

     this.registerApi = this._AuthService.signUp(this.registerForm.value).subscribe({
        next: (res) => {

          if (res.message === 'success') {
            this.successMsg = res.message;

            setTimeout(() => {
              this._Router.navigate(['/login']);
            }, 2000);
          }

          this.isLoading = false;
        },

        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.errorMsg = err.error.message;
          this.isLoading = false;
        },
      });

      console.log(this.registerForm.value);
    } else {
      this.registerForm.setErrors({ mismatch: true });
      this.registerForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.registerApi?.unsubscribe()
  }
}
