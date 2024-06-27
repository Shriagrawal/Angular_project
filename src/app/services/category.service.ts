import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl : string='http://localhost:3000'
  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  arrCategory : Category[] =[]
  constructor(private httpclient:HttpClient) { 
  }

  getCategories():Observable<Category[]>{
  return this.httpclient.get<Category[]>(this.baseUrl + '/course_categories')
  .pipe(catchError(this.httpError));
  }

  addCategory(c:Category):Observable<Category>{
    return this.httpclient.post<Category>(this.baseUrl + '/course_categories', JSON.stringify(c),this.httpHeader)
  }

  updateCategory(c:Category):Observable<Category>{
    var id = c.id
    return this.httpclient.put<Category>(this.baseUrl + '/course_categories/' + id, JSON.stringify(c) , this.httpHeader);
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
