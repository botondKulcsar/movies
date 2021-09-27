import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  BASE_URL = environment.apiUrl;
  // BASE_URL = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<any> {
    return this.http.get(`${this.BASE_URL}movies`)
  }
  getOneMovie(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}movies/${id}`)
  }
  getMoviePosts(): Observable<any> {
    return this.http.get(`${this.BASE_URL}movie-posts`)
  }
  saveNewMoviePost(post:any): Observable<any> {
    return this.http.post(`${this.BASE_URL}movie-posts`, post)
  }
  getUsers(): Observable<any> {
    return this.http.get(`${this.BASE_URL}users`)
  }
  getAdminUsers(): Observable<any> {
    return this.http.get(`${this.BASE_URL}admin/users`)
  }
  regNewUser(user: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}register`, user);
  }
}
