import { Injectable } from '@angular/core';
import { defaultRippleAnimationConfig } from '@angular/material/core';

export interface IMenuItem {
  url: string;
  text: string;
  disabled?: boolean;
  icon?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  menuItems: IMenuItem[] = [
    {url: '/', text: 'Főoldal', icon: 'home'},
    {url: '/movies', text: 'Filmek', icon: 'table_chart'},
    {url: '/actors', text: 'Színészek', icon: 'last_page'},
    {url: '/users', text: 'Felhasználóink', icon: 'filter_list'},
    {url: '/registration', text: 'Regisztráció', icon: 'person_add'},
    {url: '/login', text: 'Belépés', icon: 'login'},
    {url: '/admin', text: 'Admin', icon: 'create'},
  ]

  genre: {value: string, name: string}[] = [
    {value: 'Drama', name: 'Dráma'},
    {value: 'Comedy', name: 'Vígjáték'},
    {value: 'Horror', name: 'Horror'},
    {value: 'Romance', name: 'Romantikus'},
    {value: 'Thriller', name: 'Thriller'},
    {value: 'Sci-fi', name: 'Sci-fi'},
    {value: 'Adventure', name: 'Kaland'},
    {value: 'Action', name: 'Akció'},
    {value: 'Family', name: 'Családi'},
  ]
  constructor() { }
}
