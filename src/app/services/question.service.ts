import { Injectable } from '@angular/core';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
arrQuestion : Question[] = []

  constructor() { 
    this.arrQuestion = [
      new Question(1,"What is Angular",["S"],"t","true-false"),
      new Question(2,"What is Node",["S"],"t","true-false"),
      new Question(3,"What is React",["S"],"t","true-false")
    ]
  }

  getQuestions()
  {
    return this.arrQuestion;
  }
}
