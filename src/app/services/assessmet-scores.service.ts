import { Injectable } from '@angular/core';
import { AssessmentScores } from '../models/assessmentscores';

@Injectable({
  providedIn: 'root'
})
export class AssessmetScoresService {
  arrAssessment : AssessmentScores[] =[];
  constructor() {
    this.arrAssessment=[
      new AssessmentScores(1,2,3,4),
    ]
   }
}
