import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';

@Component({
  selector: 'app-updatecourse',
  templateUrl: './updatecourse.component.html',
  styleUrl: './updatecourse.component.scss'
})
export class UpdatecourseComponent {
  updatecourseform: FormGroup;
  arrcourses : Course[] = [];
  tempcourse : Course = new Course("","","");
  idObtained : string = ""
  constructor(public courseservice:CourseService,public fb: FormBuilder){
    this.updatecourseform = this.fb.group({
      course_name: ['', Validators.required],
      course_description: ['', Validators.required],
      id : ['',Validators.required]
    });

    this.courseservice.getcourse().subscribe(data=>{
      this.arrcourses = data;
    })
  }
  onSubmit(){
    const frmvalue = this.updatecourseform.value
    this.tempcourse.cName = frmvalue.course_name;
    this.tempcourse.cDescription = frmvalue.course_description;
    this.tempcourse.id = frmvalue.id;
     this.courseservice.updatecourse(this.tempcourse).subscribe( data=>{
      alert("Course updated");
      window.location.reload();
     }
     )
  }
  onCourseChange(event:any){

      var obj = event.target.value;
      this.idObtained = (obj.split(':')[1].trim());

      for(var i=0;i< this.arrcourses.length;i++)
        {
           if(this.idObtained == JSON.parse(this.arrcourses[i].id))
            {
              this.tempcourse = this.arrcourses[i];
            }
        }
  
        this.updatecourseform.get('course_name')?.setValue(this.tempcourse.cName.toString());
        this.updatecourseform.get('course_description')?.setValue(this.tempcourse.cDescription.toString());
  }
}
