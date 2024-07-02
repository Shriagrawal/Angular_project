import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Attendance } from '../models/attendance';
import { AttendanceComponent } from '../components/attendance/attendance.component';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  baseUrl : string='http://localhost:3000'
  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  constructor(private httpclient:HttpClient) { }

  getAttendance():Observable<Attendance[]>{
    return this.httpclient.get<Attendance[]>(this.baseUrl+'/attendance');
  }
  addAttendance(a:Attendance):Observable<Attendance>{
    return this.httpclient.post<Attendance>(this.baseUrl + '/attendance',JSON.stringify(a),this.httpHeader);
  }

  deleteAttendance(id:string):Observable<Attendance>{
    var idn = JSON.parse(id)
   return this.httpclient.delete<Attendance>(this.baseUrl + '/attendance/' + idn)
  }
}
