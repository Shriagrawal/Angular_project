import { Component } from '@angular/core';
import { Users } from '../../models/users';
import { AddUserService } from '../../services/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.scss'
})
export class ViewUserComponent {
  arrUsers:Users[]=[];
  constructor(private userservice:AddUserService)
  {
      this.userservice.getUsers().subscribe(data=>{
        this.arrUsers = data
      })
  }
}
