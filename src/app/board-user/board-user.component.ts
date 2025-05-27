import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { localStorageService } from '../_services/localStorage.service';
import { IUser } from '../interfaces/IUser.interface';
import { BaseResponse } from '../interfaces/IProduct.interface';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css'],
})
export class BoardUserComponent implements OnInit {
  user!: BaseResponse<IUser>;
  constructor(
    private userService: UserService,
    private localStorage: localStorageService
  ) {}

  ngOnInit(): void {
    let userId = this.localStorage.getUser()._id;

    this.userService.getUserData(userId).subscribe({
      next: (data) => {
        console.log(data);
        this.user = data;
      },
      error: (err) => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            console.log(res);
          } catch {
            console.log(`Error with status: ${err.status} - ${err.statusText}`);
          }
        } else {
          console.log(`Error with status: ${err.status}`);
        }
      },
    });
  }
}
