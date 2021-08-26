import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserLogin } from 'src/app/model/user-login.model';
import { AuthService } from 'src/app/services/auth.service';
import { ValidationErrorHandlerService } from 'src/app/services/validation-error-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;  // pwd visible switch

  loginSubscription: Subscription = new Subscription;
  userObject: any;

  userLogin = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get email() {
    return this.userLogin.controls['email'] as FormControl;
  }
  get password() {
    return this.userLogin.controls['password'] as FormControl;
  }

  constructor(
    private authService: AuthService,
    private validErrorHandler: ValidationErrorHandlerService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(user: UserLogin) {

    this.loginSubscription = this.authService.login(user)
      .subscribe(
        () => { },
        (err) => {
          this._snackBar.open(`Hoppá, nem sikerült bejelentkezni! \n ${err.error.message}\nKód: ${err.status}`,
            'OK', {
            duration: 5000
          });
          console.error(err);
        },
        () => {
          this.userLogin.reset();
          this._snackBar.open(`Sikeres belépés`, 'OK', { duration: 2000 });
          this.router.navigate(['/']);
        }
      )
  }

  getErrorMessage(formName: FormGroup, formControlName: string) {
    return this.validErrorHandler.getErrorMessage(formName, formControlName);
  }

}
