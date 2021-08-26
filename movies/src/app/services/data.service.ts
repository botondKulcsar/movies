import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  selectedMovie: BehaviorSubject<any> = new BehaviorSubject<any>(null)
  constructor() { }
}
