import { EventEmitter, Injectable } from '@angular/core';
import { Assessment } from '../models/assessment';
import { CartService } from './cart.service';
import { Cart } from '../models/cart';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { userDashboard } from '../models/userDashboard';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddToDashboardService {
  baseUrl : string='http://localhost:3000'
  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  myEvent : EventEmitter<string> = new EventEmitter<string>();
  addToDashboard : EventEmitter<string>
  arrcart:Cart[] = [];
  constructor(private cartservice:CartService,private httpclient:HttpClient) { 
    this.addToDashboard = new EventEmitter<string>();
    this.cartservice.getcart().subscribe(data=>{
      this.arrcart = data;
    })
  }
ngOnInit(): void {
    this.myEvent.subscribe((assessment:Assessment)=>{console.log(assessment)})
}
 addDashboard(){
  this.addToDashboard.emit("oh oh oh")
}

addAssToDashboard(ud:userDashboard):Observable<userDashboard>{
  return this.httpclient.post<userDashboard>(this.baseUrl + '/dashboard',JSON.stringify(ud),this.httpHeader)
}

getDashboardbyId(id:number):Observable<userDashboard>{
  return this.httpclient.get<userDashboard>(this.baseUrl + '/dashboard/' + id)
}

getDashboard():Observable<userDashboard[]>{
  return this.httpclient.get<userDashboard[]>(this.baseUrl + '/dashboard')
}

updateDashboard(ud:userDashboard):Observable<userDashboard>{
  var id = ud.id
  return this.httpclient.put<userDashboard>(this.baseUrl + '/dashboard/' + id, JSON.stringify(ud),this.httpHeader)
}
}
