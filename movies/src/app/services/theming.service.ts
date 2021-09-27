import { ApplicationRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemingService {
  themes = ['movie-dark-theme', 'movie-light-theme']; // <- list all themes in this array
  theme = new BehaviorSubject('movie-light-theme'); // <- initial theme

  constructor(private ref: ApplicationRef) {
    // Initially check if dark mode is enabled on system
    const darkModeOn =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    // If dark mode is enabled then directly switch to the dark-theme
    if (darkModeOn) {
      this.theme.next('movie-dark-theme');
    } else {
      this.theme.next('movie-light-theme');
    }

    // Watch for changes of the preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      const turnOn = e.matches;
      this.theme.next(turnOn ? 'movie-dark-theme' : 'movie-light-theme');

      console.log(turnOn);  // debug

      // Trigger refresh of UI
      this.ref.tick();
    });
  }
}
