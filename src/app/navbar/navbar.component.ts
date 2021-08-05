import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() toggleSide = new EventEmitter<void>();

  isMobileScreen: boolean | undefined = false;

  constructor(private observer: BreakpointObserver,) { }

  ngOnInit(): void {
    this.onObserveScreenSize()
  }

  onObserveScreenSize() {
    this.isMobileScreen = this.observer.isMatched('(max-width: 768px)');
    this.observer.observe('(max-width: 768px)').subscribe((res) => {
      this.isMobileScreen = res.matches;
    });
  }

  onToggleSide(){
    this.toggleSide.next();
  }

}
