import { Validators } from '@angular/forms';

export const registerVaildators = {
  name: [Validators.required, Validators.minLength(3),Validators.maxLength(20)],
  email: [Validators.required, Validators.email],
  password: [Validators.required, Validators.pattern(/^\w{6,}$/)],
};
