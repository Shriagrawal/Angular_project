import { Component } from '@angular/core';
import { Assessment } from '../../models/assessment';
import { AssessmentService } from '../../services/assessment.service';

@Component({
  selector: 'app-viewadminassessment',
  templateUrl: './viewadminassessment.component.html',
  styleUrl: './viewadminassessment.component.scss'
})
export class ViewadminassessmentComponent {
   temparrass : Assessment[] = [];
   constructor(private assessmentservice:AssessmentService){
    this.assessmentservice.getAssessment().subscribe(data=>{
      this.temparrass = data;
    })

   }


}
