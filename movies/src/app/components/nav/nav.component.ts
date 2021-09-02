import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/config.service';
import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  menuItems = this.configService.menuItems;

  userObject: any;
  userSignInSubscription?: Subscription;
  userLogoutSubscription?: Subscription;
  userRefreshSubscription?: Subscription;

  loggedIn = false;


  constructor(
    private configService: ConfigService,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('refreshToken')) {
      this.userRefreshSubscription = this.authService.refreshUserAuthentication().subscribe(
        () => {},
        (err) => {
          this._snackBar.open(`A munkamenet lejárt, lépj be újra!`, 'OK', {
            duration: 5000,
            panelClass: ['snackbar-error']
          });
        }
      )
    }

    this.userSignInSubscription = this.authService.getUserLoggedInObj().subscribe(
      (user) => {
        this.userObject = user;
        this.loggedIn = Boolean(this.userObject);
        console.log('userObject at nav: ', this.userObject, this.loggedIn)  // debug
      },
      (err) => { },
      () => { }
    )
  }

  ngOnDestroy(): void {

    if (this.userLogoutSubscription) this.userLogoutSubscription.unsubscribe();
    if (this.userRefreshSubscription) this.userRefreshSubscription.unsubscribe();
    if (this.userSignInSubscription) this.userSignInSubscription.unsubscribe();

  }

  logout() {
    this.userLogoutSubscription = this.authService.logout().subscribe(
      () => { },
      (err) => { err },
      () => {
        this._snackBar.open(`Sikeres kilépés`, 'OK', {
          duration: 2000,
          panelClass: ['snackbar-ok']
        });
        this.router.navigate([''])
      }
    )
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {});

    dialogRef.afterClosed().subscribe(result => {});
  }

  openRegDialog(): void {
    const dialogRef = this.dialog.open(RegistrationComponent, {});

    dialogRef.afterClosed().subscribe(result => {});
  }

  clicked(item: any) {
    console.log(item);
    if(item.text === 'Kilépés') {
      console.log('Kiléptem');
    }
  }

}
