import { Component } from '@angular/core';
import { Users } from '../../models/users';
import { AddUserService } from '../../services/user.service';
import { CanActivateFn } from "@angular/router";
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  arrUser: Users[] = [];
  allowed: boolean = false;

  constructor(private userService: AddUserService,private localstorage: LocalStorageService) {
    this.userService.getUsers().subscribe(data=>{
      this.arrUser = data
    })   }

  onSubmit(form: any): void {
    console.log(form)
    const nameInput = form.name;
    const user = this.arrUser.find(user => user.firstName.toLowerCase() === nameInput.toLowerCase());

    if (user && user.role === 'admin') {
      this.allowed = true;
      localStorage.setItem("nameInput",nameInput);
      alert('Welcome admin');
    } else if(user && user.role === 'user'){
      this.allowed = false;
      localStorage.setItem("nameInput",nameInput);
      alert('welcome user');
    }
    else{
      alert('User not found')
    }
  }

}


