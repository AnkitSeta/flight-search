import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  users: any[] = [];
  userSub: Subscription | undefined;
  totalUsers: number = 0;
  maleUsers: number = 0;
  femaleUsers: number = 0;

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.observeUser();
  }

  //Observe Users
  observeUser() {
    this.userSub = this.userService.users.subscribe((res) => {
      this.users = res;
      this.totalUsers = res ? res.length : 0;
      this.calMaleFemaleUser();
    });
  }


  //Calculate Total male and female Users
  calMaleFemaleUser() {
    this.maleUsers = 0;
    this.femaleUsers = 0;

    this.users.forEach((user) => {
      if (user.gender === 'MALE') this.maleUsers++;
      else this.femaleUsers++;
    });
  }

  //Calculate percent of total users
  calUserPercent() {
    if (this.users.length > 10) {
      return 100;
    } else {
      return (this.users.length / 10) * 100;
    }
  }

  ngOnDestroy() {
    if (this.userSub) this.userSub.unsubscribe();
  }
}
