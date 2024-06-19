import { Injectable } from '@angular/core';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  arrCategory : Category[] =[]
  constructor() { 
    this.arrCategory = [
      new Category(1,"R")
    ]
  }
}
