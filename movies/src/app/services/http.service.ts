import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  BASE_URL = 'http://localhost:3000/'
  constructor(private http: HttpClient) { }

  getMovies(): Observable<any> {
    return this.http.get(`${this.BASE_URL}movies`)
  }
  getOneMovie(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}movies/${id}`)
  }
}
