import { Injectable } from '@angular/core';
import { AssessmentScores } from '../models/assessmentscores';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssessmetScoresService {
  baseUrl : string='http://localhost:3000'
  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  constructor() {
       
   }
}
