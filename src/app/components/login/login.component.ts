import { Component } from '@angular/core';
import { Users } from '../../models/users';
import { AddUserService } from '../../services/user.service';
import { CanActivateFn } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  arrUser: Users[] = [];
  allowed: boolean = false;

  constructor(private userService: AddUserService) {
    this.arrUser = this.userService.getUsers();
  }

  onSubmit(form: any): void {
    const nameInput = form.value.name;
    const user = this.arrUser.find(user => user.firstName.toLowerCase() === nameInput.toLowerCase());

    if (user && user.role === 'admin') {
      this.allowed = true;
      alert('Access granted');
    } else {
      this.allowed = false;
      alert('Access denied. Only admins are allowed.');
    }
  }
}


