import { Injectable } from '@angular/core';
import { AddUserService } from './user.service';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  arrUser : Users[] = [];
  constructor(private userservice:AddUserService) {
     this.userservice.getUsers().subscribe(data=>{
       this.arrUser = data;
    })
  }

   logoutUser()
   {
       window.localStorage.removeItem("nameInput")
   }
   getUserId():string
   { let username
    if (typeof localStorage !== 'undefined') {
     username = localStorage.getItem("nameInput")
    }
    for(var i=0;i<this.arrUser.length;i++)
      {
          if(this.arrUser[i].firstName == username)
            {
              return (this.arrUser[i].id).toString();
            }
      }
      return "0";
   }

   loggedIn()
   {
     if(localStorage.getItem("nameInput")!=null)
      {
        return true;
      }
      else{
        return false;
      }
   }
}
