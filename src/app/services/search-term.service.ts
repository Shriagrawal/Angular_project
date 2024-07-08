import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchTermService {
  // searchTerm:string = ""
  private searchTerm = new BehaviorSubject<string>('');
  currentSearchTerm = this.searchTerm.asObservable();
  constructor() { }
  setSearchTerm(term:any)
  {
      this.searchTerm.next(term);
  }
}
