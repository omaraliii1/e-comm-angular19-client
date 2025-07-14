import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { loggedInUserResponse } from '../interfaces/ILoginResponse.interface';
import { environment } from '../../../environment';
import { IUser } from '../interfaces/IUser.interface';
import { BaseResponse } from '../interfaces/IProduct.interface';

const API_URL = environment.API_URL;
const USER_KEY = environment.USER_KEY;
const AUTH_TOKEN = environment.AUTH_TOKEN;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(
    username: string,
    password: string
  ): Observable<BaseResponse<loggedInUserResponse>> {
    return this.http
      .post<BaseResponse<loggedInUserResponse>>(
        API_URL + 'users/login',
        { username, password },
        httpOptions
      )
      .pipe(
        tap((response: BaseResponse<loggedInUserResponse>) => {
          localStorage.clear();
          console.log(response);
          localStorage.setItem(AUTH_TOKEN, response.data.auth_token);
          localStorage.setItem(USER_KEY, JSON.stringify(response.data));
        })
      );
  }

  register(
    username: string,
    email: string,
    password: string
  ): Observable<BaseResponse<IUser>> {
    return this.http.post<BaseResponse<IUser>>(
      API_URL + 'users/',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  logout() {
    localStorage.clear();
  }
}
