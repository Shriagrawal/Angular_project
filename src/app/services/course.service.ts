import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  baseUrl : string='http://localhost:3000'
  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  arrCourse: Course[] = [];
  max_id : number = 0;

  constructor(public httpclient:HttpClient) { 
  }

  getcourse():Observable<Course[]>{
    return this.httpclient.get<Course[]>(this.baseUrl + '/Course');
  }

  addcourse(c:Course):Observable<Course>{
    return this.httpclient.post<Course>(this.baseUrl + '/Course' , JSON.stringify(c),this.httpHeader)
  }
  
  updatecourse(c:Course):Observable<Course>{
    var id = c.id
    return this.httpclient.put<Course>(this.baseUrl + '/Course/' + id, JSON.stringify(c),this.httpHeader);
  }

  getmaxId(): Observable<number> {
    return this.getcourse().pipe(
      map((courses: any[]) => {
        this.arrCourse = courses;
        this.max_id = courses.reduce((max: number, course: { id: string; }) => Math.max(max, parseInt(course.id)), 0);
        return this.max_id + 1;
      })
    );
  }

}
