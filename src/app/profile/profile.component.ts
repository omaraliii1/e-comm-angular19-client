import { Component, OnInit } from '@angular/core';
import { localStorageService } from '../_services/localStorage.service';
import { IUser } from '../interfaces/IUser.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user = {} as IUser;
  constructor(private localStorage: localStorageService) {}

  ngOnInit(): void {
    this.user = this.localStorage.getUser();
  }
}
