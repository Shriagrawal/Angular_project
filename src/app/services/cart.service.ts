import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Assessment } from '../models/assessment';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  arrcart : Cart[] = []
  baseUrl : string='http://localhost:3000'
   httpHeader={
     headers:new HttpHeaders({
       'Content-Type':'application/json'
     })
   }
   constructor(private httpclient:HttpClient){}

   addtocart(c:Cart):Observable<Cart>{
    return this.httpclient.post<Cart>(this.baseUrl + '/cart',JSON.stringify(c),this.httpHeader)
    .pipe(catchError(this.httpError));
   }

   getcart():Observable<Cart[]>{
    return this.httpclient.get<Cart[]>(this.baseUrl + '/cart')
    .pipe(catchError(this.httpError))
   }

   updatecart(c:Cart):Observable<Cart>{
    var id = c.id
    return this.httpclient.put<Cart>(this.baseUrl+ '/cart/' + id,JSON.stringify(c),this.httpHeader)
    .pipe(catchError(this.httpError));
   }

  getcartbyid(userId:number){
      for(var i=0;i<this.arrcart.length;i++)
        {
          if(this.arrcart[i].id == JSON.stringify(userId))
            {
              return this.arrcart[i];
            }
        }
        return new Cart("","",[],[],0,0);
  }
  
  deleteCart(id:number):Observable<Cart>{
   return this.httpclient.delete<Cart>(this.baseUrl + '/cart/'+ id);
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
