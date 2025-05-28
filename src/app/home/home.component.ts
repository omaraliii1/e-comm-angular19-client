import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  content?: string;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe({
      next: (data) => {
        console.log(data);
        this.content = data.message;
      },
      error: (err) => {
        console.error('Error fetching public content:', err);
        this.content = 'Could not load content. Please try again later.';
      },
    });
  }
}
