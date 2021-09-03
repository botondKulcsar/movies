import { Injectable } from '@angular/core';
import { defaultRippleAnimationConfig } from '@angular/material/core';

export interface IMenuItem {
  url: string;
  text: string;
  disabled?: boolean;
  icon?: string;
  action: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  menuItems: IMenuItem[] = [
    { url: '/', text: 'Főoldal', icon: 'home', action: ''},
    { url: '/movies', text: 'Filmek', icon: 'table_chart', action: ''},
    { url: '/actors', text: 'Színészek', icon: 'last_page', action: ''},
    { url: '/users', text: 'Felhasználóink', icon: 'filter_list', action: ''},
    { url: '/', text: 'Regisztráció', icon: 'person_add', action: 'registration'},
    { url: '/', text: 'Belépés', icon: 'login', action: 'login'},
    { url: '/', text: 'Kilépés', icon: 'logout', action: 'logout'},
    { url: '/admin', text: 'Admin', icon: 'create', action: ''},
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
}
