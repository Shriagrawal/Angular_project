import { Component, OnInit } from '@angular/core';
import { Users } from '../../models/users';
import { LocalStorageService } from '../../services/local-storage.service';
import { EventEmitterService } from '../../services/event-emitter.service';
import { SearchFilterService } from '../../services/search-filter.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  showCartoption: boolean = false;
   login: boolean = true;
   logout : boolean = false;
   quantity : number = 0;
   searchTerm :string = ""
  constructor(private localstorage: LocalStorageService,private eventemitterservice:EventEmitterService,private searchfilter:SearchFilterService){
  }
ngOnInit(): void {
   this.eventemitterservice.putInDashboard.subscribe((quan:number)=>{
    this.quantity = quan;
   })
  }
 
Logout()
{
  this.localstorage.logoutUser();
  this.login = !this.login;
  this.logout = !this.logout;
}
Login()
{
  if(this.localstorage.loggedIn() == true)
    {
        this.logout = true;
    }
}

onSubmit()
{
   this.searchfilter.setSearchTerm(this.searchTerm);
}

}
