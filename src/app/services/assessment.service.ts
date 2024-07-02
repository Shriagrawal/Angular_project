import { Injectable } from '@angular/core';
import { Assessment } from '../models/assessment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {
   arrAssessments : Assessment[]=[]
   arrLatestAssessment : Assessment[] = []
   baseUrl : string='http://localhost:3000'
   httpHeader={
     headers:new HttpHeaders({
       'Content-Type':'application/json'
     })
   }
   constructor(private httpclient:HttpClient){}

getAssessment():Observable<Assessment[]>{
  return this.httpclient.get<Assessment[]>(this.baseUrl + '/assessment')
  .pipe(catchError(this.httpError));
}

// getAssessmentbyId(id:number)
// { 
//   for(var i=0;i<this.arrAssessments.length;i++)
//     {
//       if(id == this.arrAssessments[i].id)
//         {
//           return this.arrAssessments[i]
//         }
//     }
//     return new Assessment("",true,0,0,"","",0,[],"");
// }

getAssessmentbyId(id:number):Observable<Assessment>{
  return this.httpclient.get<Assessment>(this.baseUrl + '/assessment/'+id)
  .pipe(catchError(this.httpError));
}
getPrice(id: number): Observable<number> {
  return this.getAssessmentbyId(id).pipe(
    map((data: { price: any; }) => data.price),
    catchError(this.httpError)
  );
}

addAssessment(a:Assessment):Observable<Assessment>{
  return this.httpclient.post<Assessment>(this.baseUrl + '/assessment',JSON.stringify(a),this.httpHeader)
  .pipe(catchError(this.httpError));
}

updateAssessment(a:Assessment):Observable<Assessment>{
  var id = a.id
  return this.httpclient.put<Assessment>(this.baseUrl + '/assessment/' + id,JSON.stringify(a),this.httpHeader)
  .pipe(catchError(this.httpError));
}

httpError(error:HttpErrorResponse){
  let msg='';
  if(error.error instanceof ErrorEvent){
    msg=error.error.message;
  }
  else{
    msg=`Error Code:${error.status}\nMessafe:${error.message}`;
  }
  console.log(msg);
  return throwError(msg);
}
}
