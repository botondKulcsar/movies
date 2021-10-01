import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemingService } from './services/theming.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'movies';
  themingSubscription!: Subscription;

  constructor(
    private themingService: ThemingService,
    private overlayContainer: OverlayContainer
  ) { }

  @HostBinding('class') public cssClass!: string;

  ngOnInit() {
    this.themingSubscription = this.themingService.theme.subscribe((theme: string) => {
      this.cssClass = theme;
      console.log('theme from app.component subscription:', theme);   // debug
      this.applyThemeOnOverlays();
    });
  }

  private applyThemeOnOverlays() {
    // remove old theme class and add new theme class
    // we're removing any css class that contains '-theme' string but your theme classes can follow any pattern
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(this.themingService.themes);
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(this.cssClass);
  }

  ngOnDestroy() {
    this.themingSubscription.unsubscribe();
  }
}
