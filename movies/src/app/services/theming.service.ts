import { ApplicationRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ThemingService {
  storedTheme: string | null = localStorage.getItem('theme');
  themes: string[] = ['dark-mode', 'light-mode'];
  theme: BehaviorSubject<string> = new BehaviorSubject(this.storedTheme || this.themes[1]);

  constructor(private ref: ApplicationRef) {

    console.log('storedTheme: ', this.storedTheme);   // debug
    console.log('theme: ', this.theme);   // debug

    // Initially check if dark mode is enabled on system
    const darkModeOn =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    // If dark mode is enabled then directly switch to the dark-theme
    if (darkModeOn && this.storedTheme !== this.themes[1]) {
      this.theme.next(this.themes[0]);
    } else {
      this.theme.next(this.themes[1]);
    }

    // Watch for changes of the preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      const turnOn = e.matches;
      console.log('matchMedia turnOn: ', turnOn);     // debug
      this.theme.next(turnOn ? this.themes[0] : this.themes[1]);

      // Trigger refresh of UI
      this.ref.tick();
    });
  };
}
