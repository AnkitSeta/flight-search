import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { UsersService } from './users.service';


interface User {
  name?: string;
  email?: string;
  gender?: Gender;
  address?: string;
  dob?: string;
}

type Gender = 'MALE' | 'FEMALE';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    'dob',
    'name',
    'email',
    'gender',
    'address',
    'action',
  ];
  users: Observable<User[]> | undefined;
  constructor(
    private userService: UsersService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.observeUser();
    this.getUsers();
  }

  //Call to get users
  getUsers() {
    this.userService.get().subscribe((res) => {});
  }

  //observe User Subject
  observeUser() {
    this.users = this.userService.users;
  }


  //Delete User 
  onDelete(index: number) {
    let users = this.userService.users.getValue();
    users.splice(index, 1);
    this.userService.users.next(users);
    this.snackBar.open('User Deleted', 'Clear', {
      duration: 3000,
    });
  }


  //Opens Add User Dialog
  onAddUser() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      //Updates Users if User added
      if (result) {
        let users: User[] = this.userService.users.getValue();
        users.push(result);
        this.userService.users.next(users);
        this.snackBar.open('User Added', 'Clear', {
          duration: 3000,
        });
      }
    });
  }
}
