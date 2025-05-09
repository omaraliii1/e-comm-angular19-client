import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/api/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'public', { responseType: 'text' });
  }

  getUserData(userId: string): Observable<any> {
    return this.http.get(`${API_URL}private/${userId}`, {
      headers: { auth_token: sessionStorage.getItem('auth_token') || '' },
    });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'users/all', {
      headers: { auth_token: sessionStorage.getItem('auth_token') || '' },
    });
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${API_URL}users/${userId}`, {
      headers: { auth_token: sessionStorage.getItem('auth_token') || '' },
    });
  }

  updateUser(user: any): Observable<any> {
    return this.http.put(`${API_URL}users/update/${user.id}`, user, {
      headers: { auth_token: sessionStorage.getItem('auth_token') || '' },
    });
  }
}
