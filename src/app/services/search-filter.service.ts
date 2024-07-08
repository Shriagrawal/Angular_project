import { PipeTransform,Pipe, Injectable } from '@angular/core';
import { Users } from '../models/users';
import { BehaviorSubject } from 'rxjs';

@Pipe({
  name : 'filter',
  pure : false
})
export class SearchFilterService implements PipeTransform{
  // searchTerm:string = ""
  private searchTerm = new BehaviorSubject<string>('');
  currentSearchTerm = this.searchTerm.asObservable();
  constructor() { }
 
  setSearchTerm(term:any)
  {
      this.searchTerm.next(term);
  }

  transform(users: Users[], searchTerm : string): Users[] {
    return users.filter(user => user.firstName.toLowerCase()
    .indexOf(searchTerm.toLowerCase()) !== -1
  );
  }
}
