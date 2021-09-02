import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserLoggedIn } from '../model/user-logged-in.model';
import { UserLogin } from '../model/user-login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL = environment.apiUrl;
  userLoggedInObject: BehaviorSubject<UserLoggedIn | null> = new BehaviorSubject<UserLoggedIn | null>(null);

  constructor(private http: HttpClient) { }

  login(loginData: UserLogin): Observable<UserLoggedIn> {

    return this.http.post<UserLoggedIn>(this.BASE_URL + 'login', loginData)
      .pipe(
        tap(
          (loginData: UserLoggedIn) => {
            if (loginData) {
              localStorage.setItem('accessToken', loginData.accessToken);
              localStorage.setItem('refreshToken', loginData.refreshToken);
              this.userLoggedInObject.next(
                {
                  _id: loginData._id,
                  role: loginData.role,
                  accessToken: loginData.accessToken,
                  refreshToken: loginData.refreshToken
                });
            }
          },
          (err) => {
            console.error('login error: ', err);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            this.userLoggedInObject.next(null);
          })
      )
  }

  refreshUserAuthentication(): Observable<UserLoggedIn> {
    return this.http.post<any>(this.BASE_URL + 'refresh', { refreshToken: localStorage.getItem('refreshToken') })
      .pipe(
        tap(
          (res) => {
            if (res) {
              localStorage.setItem('accessToken', res.accessToken);
              this.userLoggedInObject.next({
                _id: res._id,
                role: res.role,
                accessToken: res.accessToken,
                refreshToken: res.refreshToken
              });
            }

          },
          (err) => {
            console.error('auth refresh error: ', err);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            this.userLoggedInObject.next(null);
          })
      )
  }

  logout() {

    return this.http.post(this.BASE_URL + 'logout', { refreshToken: localStorage.getItem('refreshToken') })
      .pipe(
        tap(
          (res) => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            this.userLoggedInObject.next(null);
          },
          (err) => {
            console.error('logout error: ', err);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            this.userLoggedInObject.next(null);
          })
      )
  }

  getUserLoggedInObj() {
    return this.userLoggedInObject.asObservable();
  }

  getUserAuthData() {
    return this.userLoggedInObject.value;
  }

}
