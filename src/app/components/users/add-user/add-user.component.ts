import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from '../../../models/users';
import { AddUserService } from '../../../services/user.service';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})


export class AddUserComponent {
   myForm: FormGroup;
   arrusers : Users[] = [];
   user : Users = new Users(" "," "," ",0,"");

   constructor(fb: FormBuilder,private userservice: AddUserService) {
    this.userservice.getUsers().subscribe(data=>{
      this.arrusers = data
      var max_id = 0;
      for(var i=0;i<this.arrusers.length;i++)
        {
          if(this.arrusers[i].id > max_id)
            { 
              max_id = this.arrusers[i].id
            }
        }
        this.user.id = max_id + 1;

    })
      this.myForm = fb.group({
        id : [''],
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone_no: ['', Validators.required],
        dob: ['', Validators.required],
        role: ['', Validators.required],
        password: ['', Validators.required],
        address: ['', Validators.required]
      });
      
   }

   get f() {
     return this.myForm.controls;
   }

   onSubmit(frmValue: any): void {
    // console.log('You submitted:', frmValue);
    // this.arrusers.push(frmValue);  
    this.user.firstName = frmValue.first_name;
    this.user.lastName = frmValue.last_name;
    this.user.address = frmValue.address;
    this.user.role = frmValue.role;
    this.userservice.addUser(this.user).subscribe(data => {
        console.log("new User added successfully"+data);
    })
  }
}
