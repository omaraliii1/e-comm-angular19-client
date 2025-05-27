import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { IUser } from '../interfaces/IUser.interface';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css'],
})
export class BoardAdminComponent implements OnInit {
  content?: string;
  users: IUser[] = [];
  isModalOpen: boolean = false;
  selectedUser!: IUser;
  filteredUsers: IUser[] = [];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe({
      next: (users) => {
        this.users = users.data;
        this.filteredUsers = users.data.filter((user) => user.role !== 'admin');
      },
      error: (err) => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      },
    });
  }

  openEditModal(user: IUser) {
    this.selectedUser = { ...user };
    this.isModalOpen = true;
  }

  closeEditModal() {
    this.isModalOpen = false;
  }

  onSubmitEdit() {
    this.userService.updateUser(this.selectedUser).subscribe({
      next: (data) => {
        const updatedUserIndex = this.users.findIndex(
          (user: IUser) => user._id === this.selectedUser._id
        );
        if (updatedUserIndex !== -1) {
          this.users[updatedUserIndex].email = this.selectedUser.email;
        }
        alert('Email updated successfully');
        this.isModalOpen = false;
      },
    });
  }

  onDelete(userId: string): void {
    console.log('Deleting user with ID:', userId);

    this.userService.deleteUser(userId).subscribe({
      next: () => {
        alert('User deleted successfully');
        window.location.reload();
      },
      error: (err) => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            alert(res.message);
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
