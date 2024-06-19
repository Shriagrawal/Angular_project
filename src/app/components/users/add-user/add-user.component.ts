import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Users } from '../../../models/users';
import { AddUserService } from '../../../services/user.service';

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
    this.arrusers = this.userservice.getUsers()
      this.myForm = fb.group({
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
    console.log('You submitted:', frmValue);
    this.arrusers.push(frmValue);
    console.log(this.arrusers)
  }
}
