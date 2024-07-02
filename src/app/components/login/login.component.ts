import { Component } from '@angular/core';
import { Users } from '../../models/users';
import { AddUserService } from '../../services/user.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Note: Correct property name is styleUrls (with an 's')
})
export class LoginComponent {
  arrUser: Users[] = [];
  allowed: boolean = false;

  constructor(private userService: AddUserService, private localStorage: LocalStorageService) {
    this.userService.getUsers().subscribe(data => {
      this.arrUser = data;
      console.log('Users data:', this.arrUser); 
    });
  }

  onSubmit(form: any): void {
    console.log('Form data:', form); 
    const nameInput = form.name;
    const user = this.arrUser.find(user => user.firstName.toLowerCase() === nameInput.toLowerCase());

    console.log('Found user:', user); 

    if (user) {
      localStorage.setItem("nameInput", nameInput);
      if (user.role === 'admin') {
        this.allowed = true;
        alert('Welcome admin');
      } else if (user.role === 'trainee') {
        this.allowed = false;
        alert('Welcome trainee');
      }
      else if(user.role === 'faculty')
        {
          alert('Welcome faculty')
        }
    } else {
      alert('User not found');
    }
    window.location.reload()
  }
}
