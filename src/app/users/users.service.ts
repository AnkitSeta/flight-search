import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  //Store Users Data
  users = new BehaviorSubject<any[]>([]);
  constructor(private http: HttpClient) {}

  //Return observable for Users data form Json and updates Users
  get() {
    return this.http.get<any[]>(`./assets/misc/userDate.json`).pipe(
      tap((res: any[]) => {
        this.users.next(res);
      })
    );
  }
}
