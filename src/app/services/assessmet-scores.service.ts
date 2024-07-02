import { Injectable } from '@angular/core';
import { AssessmentScores } from '../models/assessmentscores';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  constructor(private httpclient:HttpClient) {}

       addAssessmentScore(a:AssessmentScores):Observable<AssessmentScores>{
        return this.httpclient.post<AssessmentScores>(this.baseUrl + '/assessmentScore',JSON.stringify(a),this.httpHeader);
       }

       getAssessmentScore():Observable<AssessmentScores[]>{
        return this.httpclient.get<AssessmentScores[]>(this.baseUrl + '/assessmentScore')
       }

       getAssessmentScorebyId(id:number):Observable<AssessmentScores>{
        return this.httpclient.get<AssessmentScores>(this.baseUrl + '/assessmentScore/'+id)
       }

   }

