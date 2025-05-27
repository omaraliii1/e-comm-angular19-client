import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { IUser } from '../interfaces/IUser.interface';

const USER_KEY = environment.USER_KEY;
const AUTH_TOKEN = environment.AUTH_TOKEN;
@Injectable({
  providedIn: 'root',
})
export class localStorageService {
  constructor() {}

  public getUser(): IUser {
    let user = window.localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  public isTokenExpired(): boolean {
    const token = localStorage.getItem(AUTH_TOKEN);
    const user = this.getUser();
    if (token && user) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationDate = new Date(payload.exp * 1000);
      return expirationDate < new Date();
    }

    return true;
  }

  public isLoggedIn(): boolean {
    const token = window.localStorage.getItem(AUTH_TOKEN);
    if (token) {
      return true;
    }

    return false;
  }
}
