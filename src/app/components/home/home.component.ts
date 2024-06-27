import { Component, OnInit } from '@angular/core';
import { AssessmentService } from '../../services/assessment.service';
import { Assessment } from '../../models/assessment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  arrAssessments: Assessment[] = [];

  constructor(private assessmentService: AssessmentService,public router:Router) {}

  ngOnInit(): void {
    this.assessmentService.getAssessment().subscribe(
      (assessments: Assessment[]) => {
        this.arrAssessments = assessments.slice(-3).reverse();
      },
      (error) => {
        console.error('Failed to fetch assessments', error);
      }
    );
  }
  displayDetails(aid:number){
    console.log("betee.moj krdi")
    this.router.navigate(['viewassessmentdetails/' + aid])
  }
}
