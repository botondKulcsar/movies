import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserLogin } from 'src/app/model/user-login.model';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { ValidationErrorHandlerService } from 'src/app/services/validation-error-handler.service';
import { MatchValidator } from 'src/app/validators/password-match.validator';

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

  userReg: FormGroup = new FormGroup({
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
      {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(32),
          // this.matchValidator(),
          // MatchValidator()
        ]
      }
    ),
    passCheck: new FormControl('',
      {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(32),
          // this.matchValidator()
          // MatchValidator()
        ]
      }
    ),
  },
    // { validators: this.matchValidator() }
  );

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
    return this.userReg?.controls['password'] as FormControl;
  }

  get passCheck() {
    return this.userReg?.controls['passCheck'] as FormControl;
  }

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
    private validErrorHandler: ValidationErrorHandlerService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.userReg);
  }

  regUser(user: any) {

    this.httpService.regNewUser(user).subscribe(

      (data: any) => {
        this.userReg.reset();
        this._snackBar.open(
          `Sikeres regisztáció`,
          'OK',
          {
            duration: 3000,
            panelClass: ['snackbar-ok']
          }
        );
        this.login(user);
      },

      (err) => {
        this._snackBar.open(
          `Hoppá, valami döcög a szerverkapcsolatban: \nSzerverválasz: ${err.error.message}: ${err.status}`,
          'OK',
          {
            duration: 5000,
            panelClass: ['snackbar-error']
          }
        );
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

  // matchValidator(control: AbstractControl): ValidationErrors | null {
  //   const pass = control.get('password')?.value;
  //   const confirmPass = control.get('passCheck')?.value;

  //   return pass === confirmPass ? null : { notSame: true };
  // }

  matchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const pass = control.get('password')?.value;
      const confirmPass = control.get('passCheck')?.value;
      console.log('Passwords in reg component: ', pass, confirmPass);    // debug
      console.log('control in reg component: ', control);    // debug
      return (pass !== confirmPass) ? { notSame: true } : null;
    }
  }

}


