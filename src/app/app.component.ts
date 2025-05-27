import { Component } from '@angular/core';
import { localStorageService } from './_services/localStorage.service';
import { AuthService } from './_services/auth.service';
import { IUser } from '../app/interfaces/IUser.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  user = {} as IUser;
  isLoggedIn = false;
  showAdminBoard = false;

  constructor(
    private localStorage: localStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.localStorage.isLoggedIn();

    if (this.isLoggedIn) {
      this.user = this.localStorage.getUser();

      if (this.user.role === 'admin') {
        this.showAdminBoard = true;
      } else {
        this.showAdminBoard = false;
      }
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
