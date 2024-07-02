import { Injectable } from '@angular/core';
import { Question } from '../models/question';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  baseUrl : string='http://localhost:3000'
  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
arrQuestion : Question[] = []
  constructor(private httpclient: HttpClient) { 
    
  }
  getQuestionsbyId(qid:number):Observable<Question>
  {
    return this.httpclient.get<Question>(this.baseUrl + '/Question/'+qid);
  }
  getQuestion():Observable<Question[]>{
    return this.httpclient.get<Question[]>(this.baseUrl + '/Question');
  }

}
