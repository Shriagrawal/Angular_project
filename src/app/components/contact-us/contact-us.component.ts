import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  user = {
    email: '',
    query: ''
  };

  onSubmit(form: any): void {
    if (form.valid) {
      console.log(this.user);
      alert('Form submitted successfully');
    } else {
      alert('Please fill out the form correctly');
    }
  }


}
