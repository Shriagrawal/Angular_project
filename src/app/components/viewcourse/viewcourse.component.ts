import { Component } from '@angular/core';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-viewcourse',
  templateUrl: './viewcourse.component.html',
  styleUrl: './viewcourse.component.scss'
})
export class ViewcourseComponent {
  arrcourse : Course[]=[];
  constructor(public courseservice:CourseService){
    this.courseservice.getcourse().subscribe(data=>{
      this.arrcourse = data;
    });
  }
}
