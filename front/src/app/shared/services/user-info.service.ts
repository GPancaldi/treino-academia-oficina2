import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  userId: number;

  constructor() { }

  setUserInfo(id: number) {
    this.userId = id;
  }

  getUserInfo(): number {
    if (localStorage.getItem('user')) {
      this.userId = parseInt((localStorage.getItem('user') || ''), 10);
    }

    return this.userId;
  }
}
