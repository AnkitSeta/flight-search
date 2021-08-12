import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'playground';
  isMobileScreen: boolean | undefined = false;
  sideMode: MatDrawerMode = 'side';
  isSideOpen: boolean = true;

  constructor(private observer: BreakpointObserver) {
    this.onObserveScreenSize();
  }

  onObserveScreenSize() {
    this.isMobileScreen = this.observer.isMatched('(max-width: 768px)');
    this.observer.observe('(max-width: 768px)').subscribe((res) => {
      this.isMobileScreen = res.matches;
      if (this.isMobileScreen) {
        this.sideMode = 'over';
      } else {
        this.sideMode = 'side';
      }
    });
  }

  onToggleSide() {
    this.isSideOpen = !this.isSideOpen;
  }

  onCloseSide() {
    if (this.isMobileScreen) this.isSideOpen = false;
  }
}
