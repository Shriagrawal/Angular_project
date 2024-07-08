import { Component } from '@angular/core';
import { Users } from '../../models/users';
import { AddUserService } from '../../services/user.service';
import { SearchFilterService } from '../../services/search-filter.service';
import { Pipe } from '@angular/core';
@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.scss'
})
export class ViewUserComponent {
  arrUsers:Users[]=[];
  searchTerm :string = "";
  constructor(private userservice:AddUserService,private searchfilter:SearchFilterService)
  {
      this.userservice.getUsers().subscribe(data=>{
        this.arrUsers = data
      })

      this.searchfilter.currentSearchTerm.subscribe(term => {
        this.searchTerm = term;
        this.searchfilter.transform(this.arrUsers,this.searchTerm);
      });
  
  }
}
