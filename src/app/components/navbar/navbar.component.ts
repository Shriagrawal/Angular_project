import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
   showLoginModal: boolean = false;

   ToggleLogin(){
    this.showLoginModal = !this.showLoginModal;
   }
}
