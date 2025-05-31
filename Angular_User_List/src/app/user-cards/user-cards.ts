import { Component, Input, OnChanges } from '@angular/core';
import { User,UserService } from '../services/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-cards.html',
  styleUrl: './user-cards.css'
})
export class UserCards implements OnChanges {
  @Input() filterText = '';
  users: User[] = [];
  filteredUsers: User[] = [];

  constructor(private userService: UserService) {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
      this.filterUsers();
    });
  }

  ngOnChanges() {
    this.filterUsers();
  }

  filterUsers() {
    if (!this.filterText) {
      this.filteredUsers = [...this.users];
      return;
    }

    const searchTerm = this.filterText.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.email.toLowerCase().includes(searchTerm)

    );
  }
}
