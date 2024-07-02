import { Component } from '@angular/core';
import { AssessmentScores } from '../../models/assessmentscores';
import { AssessmetScoresService } from '../../services/assessmet-scores.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-assessment-score',
  templateUrl: './assessment-score.component.html',
  styleUrl: './assessment-score.component.scss'
})
export class AssessmentScoreComponent {
   arrScore : AssessmentScores[] = []
   pass : string = "Pass"
   constructor(private assessmentscoreservice:AssessmetScoresService,private router:Router,private localstorageservice:LocalStorageService)
   {
        this.assessmentscoreservice.getAssessmentScore().subscribe(data=>{
          const userid = this.localstorageservice.getUserId()
          this.arrScore = data;
          console.log("this.arrScore" + this.arrScore)
          const filteredData =  this.arrScore.filter(each => each.traineeId.toString() == userid)
          this.arrScore = filteredData;
          console.log("filteredData"+filteredData);
        }
        )
   }

   viewReport(assessmentId: number) {
    this.router.navigate(['/report', assessmentId]);
  }
}
