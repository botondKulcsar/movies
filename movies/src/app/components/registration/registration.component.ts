import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserLogin } from 'src/app/model/user-login.model';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { ValidationErrorHandlerService } from 'src/app/services/validation-error-handler.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  hide = true;

  ageLimit: number = 18;
  userList: any[] = [];

  loginSubscription: Subscription = new Subscription;
  userObject: any;

  lettersOnlyPattern: string | RegExp = '^[a-zA-Z íöüóőúűéáÍÖÜÓŐÚŰÉÁ]+$';
  numbersOnlyPattern: string | RegExp = '^[0-9]+$';

  userReg = new FormGroup({
    firstName: new FormControl('',
      {
        validators: [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(this.lettersOnlyPattern)
        ],
      }
    ),
    lastName: new FormControl('',
      {
        validators: [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(this.lettersOnlyPattern)
        ],
      }
    ),
    nickName: new FormControl('',
      {
        validators: [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern(this.lettersOnlyPattern)
        ],
      }
    ),
    city: new FormControl('',
      {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(this.lettersOnlyPattern)
        ]
      }
    ),
    yearOfBirth: new FormControl('',
      {
        validators: [
          Validators.required,
          Validators.pattern(this.numbersOnlyPattern),
          Validators.min(new Date().getFullYear() - 120),
          Validators.max(new Date().getFullYear() - this.ageLimit)
        ]
      }
    ),
    avatarUrl: new FormControl('',
      {
        validators: []
      }
    ),
    email: new FormControl('',
      {
        validators: [
          Validators.required,
          Validators.email
        ],
        updateOn: 'blur'
      }
    ),
    password: new FormControl('',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(32)
      ]
    ),
    passCheck: new FormControl('',
      {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(32),
        ]
      }
    ),
  });

  get firstName() {
    return this.userReg.controls['firstName'] as FormControl;
  }

  get lastName() {
    return this.userReg.controls['lastName'] as FormControl;
  }

  get nickName() {
    return this.userReg.controls['nickName'] as FormControl;
  }

  get city() {
    return this.userReg.controls['city'] as FormControl;
  }

  get yearOfBirth() {
    return this.userReg.controls['yearOfBirth'] as FormControl;
  }

  get avatarUrl() {
    return this.userReg.controls['avatarUrl'] as FormControl;
  }

  get email() {
    return this.userReg.controls['email'] as FormControl;
  }

  get password() {
    return this.userReg.controls['password'] as FormControl;
  }

  get passCheck() {
    return this.userReg.controls['passCheck'] as FormControl;
  }

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
    private validErrorHandler: ValidationErrorHandlerService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  regUser(user: any) {

    this.httpService.regNewUser(user).subscribe(

      (data: any) => {
        this.userReg.reset();
        this._snackBar.open(`Sikeres regisztáció`, 'OK', { duration: 3000 });
        this.login(user);
      },

      (err) => {
        this._snackBar.open(`Hoppá, valami döcög a szerverkapcsolatban: \nSzerverválasz: ${err.error.message}: ${err.status}`,
          'OK', {
          duration: 5000
        });
        console.log(err);
      },

      () => { }
    )
  }

  login(user: UserLogin) {

    this.loginSubscription = this.authService.login(user)
      .subscribe(
        () => { },
        (err) => {
          this._snackBar.open(`Hoppá, nem sikerült bejelentkezni! \nSzerverválasz: ${err.error}\nKód: ${err.status}`,
            'OK', {
            duration: 5000
          });
          console.error(err);
        },
        () => {
          this._snackBar.open(`Sikeres belépés`, 'OK', { duration: 2000 });
          this.router.navigate(['/recipes']);
        }
      )
  }

  getErrorMessage(formName: FormGroup, formControlName: string) {
    return this.validErrorHandler.getErrorMessage(formName, formControlName);
  }

}


