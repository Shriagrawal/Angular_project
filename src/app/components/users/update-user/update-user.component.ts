import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Users } from '../../../models/users';
import { AddUserService } from '../../../services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent {
  myForm: FormGroup;
  arrusers : Users[] = [];
  idUdpated : number=0;
  user : Users = new Users(" "," "," ",0," ");

  constructor(fb: FormBuilder, private userservice: AddUserService) {
    this.arrusers = this.userservice.getUsers()
     this.myForm = fb.group({
       'id' : [0],
       'first_name' : ['', Validators.required],
       'last_name': ['', Validators.required],
       'email': ['', [Validators.required, Validators.email]],
       'phone_no': ['', Validators.required],
       'dob': ['', Validators.required],
       'role': ['', Validators.required],
       'password': ['', Validators.required],
       'address': ['', Validators.required]
     });
  }

  get f() {
    return this.myForm.controls;
  }

  onSubmit(frmValue: any): void {
    this.userservice.updateUser(frmValue);
    console.log(this.arrusers);
  }

  onChangeType(evt:any)
  {
    console.log(evt.target.value);
    var isObtained = evt.target.value;
    this.idUdpated = parseInt(isObtained.split(':')[1].trim());
    console.log(this.idUdpated);

    for(var i=0;i< this.arrusers.length;i++)
      {
         if(this.idUdpated == this.arrusers[i].id)
          {
            this.user = this.arrusers[i];
          }
      }

      this.myForm.get('first_name')?.setValue(this.user.firstName.toString());
      this.myForm.get('last_name')?.setValue(this.user.lastName.toString());
      this.myForm.get('address')?.setValue(this.user.address.toString());
      this.myForm.get('role')?.setValue(this.user.role.toString());
  }
 
}
