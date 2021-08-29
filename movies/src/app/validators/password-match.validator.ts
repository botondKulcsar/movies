import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function MatchValidator(control: AbstractControl): ValidatorFn {

    return (): ValidationErrors | null => {

        if (!control.value) {
            return null;
        }
        console.log('Passwords: ', control.get('password')?.value, control.get('passCheck')?.value);  // debug
        return control.get('password')?.value !== control.get('passCheck')?.value ? { match: true } : null;

    }
}