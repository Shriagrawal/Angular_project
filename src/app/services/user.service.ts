import { Injectable } from '@angular/core';
import { AddUserComponent } from '../components/users/add-user/add-user.component';
import { Users } from '../models/users';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AddUserService {
  baseUrl : string='http://localhost:3000'
  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  //  user: Users = new Users(" "," ", " ",0);
   arrUsers: Users[] = [
    // new Users("john","agrawal","abc",1,"admin"),
    // new Users("Shristi","sharma","abc",2,"user"),
   ]
  
  constructor(private httpClient : HttpClient) { 
  }

  getUsers():Observable<Users[]>{
    //return this.arrUsers
    return this.httpClient.get<Users[]>(this.baseUrl + '/users')
    .pipe(catchError(this.httpError));
  }
   
  addUser(u:Users):Observable<Users>{
    return this.httpClient.post<Users>(this.baseUrl + '/users',JSON.stringify(u),this.httpHeader)
    .pipe(catchError(this.httpError));
  }

  // updateUser(u:Users){
  //   for(var i=0;i<this.arrUsers.length;i++){
  //     if(u.id==this.arrUsers[i].id){
  //       this.arrUsers[i]=u;
  //     }
  //   }

  updateUser(u:Users):Observable<Users>{
  return this.httpClient.put<Users>(this.baseUrl + '/users',JSON.stringify(u),this.httpHeader)
  .pipe(catchError(this.httpError));
  }

  //deleteUser(u:Users):Observable<Users>{
  // return this.httpClient.delete<Users>(this.baseUrl + '/users',JSON.stringify(u),this.httpHeader)
  //.pipe(catchError(this.httpError));
  //}

    // this.arrUsers.forEach(u=>{
    //   console.log(u)
    // })
  //}

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
