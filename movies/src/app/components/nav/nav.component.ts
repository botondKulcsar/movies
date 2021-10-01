import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/config.service';
import { ThemingService } from 'src/app/services/theming.service';
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

  themes!: string[];
  theme!: string;
  isDark: boolean = false;
  themeMode: string = 'light_mode';

  constructor(
    private configService: ConfigService,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    private theming: ThemingService,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('refreshToken')) {
      this.userRefreshSubscription = this.authService.refreshUserAuthentication().subscribe(
        () => { },
        (err) => {
          this._snackBar.open(`A munkamenet lejárt, lépj be újra!`, 'OK', {
            duration: 5000,
            panelClass: ['snackbar-error']
          });
          this.openLoginDialog();
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

    this.themes = this.theming.themes;
    this.theme = this.theming.theme.value;
    this.isDark = (this.theme === this.themes[1]) ? true : false;
    this.themeMode = (this.theme === this.themes[1]) ? 'dark_mode' : 'light_mode';
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

    dialogRef.afterClosed().subscribe(result => { });
  }

  openRegDialog(): void {
    const dialogRef = this.dialog.open(RegistrationComponent, {});

    dialogRef.afterClosed().subscribe(result => { });
  }

  clickedMenuItem(item: any) {
    
    switch (item.action) {
      case 'registration':
        return this.openRegDialog();
      case 'login':
        return this.openLoginDialog();
      case 'logout':
        return this.logout();
    }
  }

  changeTheme(): void {

    if (this.theme === this.themes[0]) {
      this.theme = this.themes[1];
      this.themeMode = 'dark_mode'
    } else {
      this.theme = this.themes[0];
      this.themeMode = 'light_mode';
    }

    localStorage.setItem('theme', this.theme);

    this.theming.theme.next(this.theme);

  }

}
