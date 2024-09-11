import { AbstractControl } from "@angular/forms";

export const confirmPassword = (groub: AbstractControl) => {
    if (groub.get('password')?.value === groub.get('rePassword')?.value) {
      return null;
    } else {
      return {mismatch:true};
    }
  }