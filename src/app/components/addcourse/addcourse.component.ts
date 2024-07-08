import { Component } from '@angular/core';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrl: './addcourse.component.scss'
})
export class AddcourseComponent {
  addcourseform: FormGroup;
   submitted = false;
   arrcourse: Course[] = [];
   tempcourse : Course = new Course("","","");
   max_id : number =0
   constructor(public courseservice:CourseService,public fb: FormBuilder){
    this.addcourseform = this.fb.group({
      course_name: ['', Validators.required],
      course_description: ['', Validators.required]
    });
    this.courseservice.getcourse().subscribe(data=>{
      this.arrcourse = data;
      for(var i=0;i<this.arrcourse.length;i++){
        if(parseInt(this.arrcourse[i].id) > this.max_id)
        {
            this.max_id = parseInt(this.arrcourse[i].id);
        }
     }
    })

    
   }
  onSubmit() {
    const frmvale = this.addcourseform.value
    this.tempcourse.cName = frmvale.course_name;
    this.tempcourse.cDescription = frmvale.course_description;
    this.tempcourse.id = (this.max_id+1).toString();
    console.log(this.tempcourse + "this is tempcourse")
    this.courseservice.addcourse(this.tempcourse).subscribe(data=>{
      console.log('Form submitted successfully', frmvale);
    })
    alert("Course has been added")
    window.location.reload()
  }
}





