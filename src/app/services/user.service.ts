import { Injectable } from '@angular/core';
import { AddUserComponent } from '../components/users/add-user/add-user.component';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class AddUserService {
  
  //  user: Users = new Users(" "," ", " ",0);
   arrUsers: Users[] = [
    new Users("john","agrawal","abc",1,"admin"),
    new Users("Shristi","sharma","abc",2,"user"),
   ]
  
  constructor() { 
  }

  getUsers(){
    return this.arrUsers
  }

  updateUser(u:Users){
    for(var i=0;i<this.arrUsers.length;i++){
      if(u.id==this.arrUsers[i].id){
        this.arrUsers[i]=u;
      }
    }

    this.arrUsers.forEach(u=>{
      console.log(u)
    })
  }
}
