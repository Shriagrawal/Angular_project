import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddUserService } from '../../services/user.service';
import { Users } from '../../models/users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  tempuser: Users = new Users("","","","","");
  today: string = "";
  submitted: boolean = false;


  constructor(private fb: FormBuilder, private userservice: AddUserService) {  this.registerForm = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    DOB: ['', [Validators.required]],
    Password: ['', [Validators.required]],
    confirm_password: ['', [Validators.required]],
    h_no: ['', Validators.required],
    street: ['', Validators.required],
    area: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    country: ['', Validators.required],
    pincode: ['', Validators.required]
  },{
    validators: this.passwordMatchValidator
  }
);
}

  ngOnInit(): void {
    const today = new Date();
    this.today = today.toISOString().split('T')[0]; 
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group?.get('Password')?.value ?? '';
    const confirm_password = group?.get('confirm_password')?.value ?? '';
    return password === confirm_password ? null : { passwordMismatch: true };
  }
  

  onSubmit() {
    this.submitted = true
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      console.log(formValue);
      this.tempuser.id = "6789";
      this.tempuser.firstName = formValue.first_name;
      this.tempuser.lastName = formValue.last_name;
      this.tempuser.role = "Trainee";
      this.tempuser.address = `${formValue.h_no} ${formValue.street} ${formValue.area} ${formValue.city} ${formValue.state} ${formValue.country} ${formValue.pincode}`;

      this.userservice.addUser(this.tempuser).subscribe(data => {
        localStorage.setItem("nameInput", formValue.first_name);
        console.log('Form Submitted!', formValue);
        alert("Form has been Submitted");
        window.location.reload();
      });
    } else {
      alert("Form is invalid");
      console.log('Form is invalid!');
    }
  }
}
