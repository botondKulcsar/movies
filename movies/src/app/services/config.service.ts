import { Injectable } from '@angular/core';

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
    {url: '/admin', text: 'Admin', icon: 'create'},
  ]
  constructor() { }
}
