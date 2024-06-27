import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-view-assessment-details',
  templateUrl: './view-assessment-details.component.html',
  styleUrl: './view-assessment-details.component.scss'
})
export class ViewAssessmentDetailsComponent {
  constructor(private activatedRouter: ActivatedRoute){
    this.activatedRouter.params.subscribe((params:Params)=>{
      console.log(params['id'])
    })
  }
}
