import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/config.service';

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
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('refreshToken')) {
      this.userRefreshSubscription = this.authService.refreshUserAuthentication().subscribe()
    }

    this.userSignInSubscription = this.authService.getUserLoggedInObj().subscribe(
      (user) => {
        this.userObject = user;
        this.loggedIn = Boolean(this.userObject);
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

}
