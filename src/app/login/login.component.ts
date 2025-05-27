import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { localStorageService } from '../_services/localStorage.service';
import { IUser } from '../interfaces/IUser.interface';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = {} as IUser;
  form: IUser = {
    username: '',
    password: '',
    email: '',
    _id: '',
    role: '',
    auth_token: '',
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  // role: string = '';
  token: string = '';
  constructor(
    private authService: AuthService,
    private localStorageService: localStorageService
  ) {}

  ngOnInit(): void {
    if (this.localStorageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.user = this.localStorageService.getUser();
      // this.role = this.localStorageService.getUser().role;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: () => {
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      error: (err) => {
        this.isLoginFailed = true;
        this.errorMessage = err.error.message || 'Unexpected error occurred';
      },
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
