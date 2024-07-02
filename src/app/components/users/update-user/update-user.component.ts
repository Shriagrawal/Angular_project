import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from '../../../models/users';
import { AddUserService } from '../../../services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent {
  myForm: FormGroup;
  arrusers: Users[] = [];
  user: Users = new Users(" ", " ", " ", "", " ");
  submitted = false;
  idUdpated : number=0;

  constructor(private fb: FormBuilder, private userservice: AddUserService) {
    this.userservice.getUsers().subscribe(data => {
      this.arrusers = data;
    });

    this.myForm = this.fb.group({
      id: [0],
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

  onSubmit(): void {
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }

    const frmValue = this.myForm.value;
    this.user.firstName = frmValue.first_name;
    this.user.lastName = frmValue.last_name;
    this.user.address = frmValue.address;
    this.user.role = frmValue.role;

    this.userservice.updateUser(this.user).subscribe(data => {
      console.log(data);
      alert("User Updated")
      window.location.reload();
    });
  }

  onChangeType(evt:any)
  {
    console.log(evt.target.value);
    var isObtained = evt.target.value;
    this.idUdpated = parseInt(isObtained.split(':')[1].trim());
    console.log(this.idUdpated);

    for(var i=0;i< this.arrusers.length;i++)
      {
         if(this.idUdpated == JSON.parse(this.arrusers[i].id))
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
