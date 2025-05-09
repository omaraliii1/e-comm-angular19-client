import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css'],
})
export class BoardAdminComponent implements OnInit {
  content?: string;
  users?: any;
  isModalOpen: boolean = false;
  selectedUserId: string | null = null;
  selectedUser: any = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe({
      next: (data) => {
        this.users = data.users;
        // console.log(this.users);
        this.content = data;
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

  openEditModal(user: any) {
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
          (user: any) => user.id === this.selectedUser.id
        );
        if (updatedUserIndex !== -1) {
          this.users[updatedUserIndex] = this.selectedUser;
        }
        alert('Email updated successfully');
        this.isModalOpen = false;
      },
      error: (err) => {
        if (err.error && typeof err.error === 'object') {
          alert(err.error.message || 'Failed to update email');
        } else {
          alert('Unexpected error occurred');
        }
        console.error('Error updating user:', err);
      },
    });
  }

  onDelete(userId: string, userRole: string): void {
    if (userRole === 'admin') {
      alert('You cannot delete another admin.');
      return;
    }

    this.selectedUserId = userId;
    console.log('Deleting user with ID:', this.selectedUserId);

    this.userService.deleteUser(this.selectedUserId).subscribe({
      next: (data) => {
        alert('User deleted successfully');
        window.location.reload();
        this.content = data;
      },
      error: (err) => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
            alert(res.message);
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      },
    });
  }
}
