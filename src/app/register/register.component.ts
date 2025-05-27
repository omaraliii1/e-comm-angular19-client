import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { delay, of } from 'rxjs';
import { IUser } from '../interfaces/IUser.interface';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form: IUser = {
    username: '',
    email: '',
    password: '',
    _id: '',
    role: '',
    auth_token: '',
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    const { username, email, password } = this.form;

    this.authService.register(username, email, password).subscribe({
      next: (data) => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;

        of(null)
          .pipe(delay(1000))
          .subscribe(() => {
            this.router.navigate(['/login']);
          });
      },
      error: (err) => {
        this.errorMessage = err.error?.message;

        alert(this.errorMessage);
        this.isSignUpFailed = true;
      },
    });
  }
}
