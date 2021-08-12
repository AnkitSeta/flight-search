import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { JourneyType } from '../core/models/flight.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Output() closeFilter = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {
  }

  onCloseFilter(){
    this.closeFilter.next();
  }

  ngOnDestroy() {
  }
}
