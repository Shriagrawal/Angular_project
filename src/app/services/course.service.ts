import { Injectable } from '@angular/core';
import { Course } from '../models/course';
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  
  arrCourse: Course[] = [];

  constructor() { 
   this.arrCourse =[
    new Course(1,"s","a"),
   ]
  }
}
