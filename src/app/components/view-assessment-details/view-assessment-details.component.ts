import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Assessment } from '../../models/assessment';
import { AssessmentService } from '../../services/assessment.service';

@Component({
  selector: 'app-view-assessment-details',
  templateUrl: './view-assessment-details.component.html',
  styleUrl: './view-assessment-details.component.scss'
})
export class ViewAssessmentDetailsComponent {
  tempAssessment : Assessment = new Assessment("",true,"",0,"",0,0,[],"",0);
  id : string = "";
  constructor(public activatedRouter: ActivatedRoute,public assessmentservice:AssessmentService){
    this.activatedRouter.params.subscribe((params:Params)=>{
      console.log(params['id']);
      this.id = params['id'];
    })
     this.assessmentservice.getAssessmentbyId(parseInt(this.id)).subscribe( data =>{
      this.tempAssessment = data;
      console.log(this.tempAssessment);
     }
     )
  }
}
