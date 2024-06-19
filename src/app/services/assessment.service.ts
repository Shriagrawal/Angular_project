import { Injectable } from '@angular/core';
import { Assessment } from '../models/assessment';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {
   arrAssessments : Assessment[]=[]

constructor(){
  this.arrAssessments = [
    new Assessment("Assessment 1",true,1,1,"04-01-2025","12:30",8,[]),
    new Assessment("Assessment 2",true,2,2,"05-01-2025","2:30",9,[]),
    new Assessment("Assessment 3",true,3,3,"06-01-2025","12:00",18,[]),
    new Assessment("Assessment 4",true,4,4,"06-01-2025","12:00",18,[]),
    new Assessment("Assessment 5",true,5,5,"06-01-2025","12:00",18,[]),
    new Assessment("Assessment 6",true,6,6,"06-01-2025","12:00",18,[]),
    new Assessment("Assessment 7",true,7,7,"06-01-2025","12:00",18,[])
    ]
}

getAssessment()
{
  return this.arrAssessments
}

getAssessmentbyId(id:number)
{ 
  for(var i=0;i<this.arrAssessments.length;i++)
    {
      if(id == this.arrAssessments[i].id)
        {
          return this.arrAssessments[i]
        }
    }
    return new Assessment("Assessment 4",true,3,4,"06-01-2025","12:00",18,[]);
}

}
