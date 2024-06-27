import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {
  putInDashboard : EventEmitter<number> = new EventEmitter<number>
  logAttendance : EventEmitter<string> = new EventEmitter<string>
  Quantity : number = 0
  constructor() { }
  
  onCheckOut(quan:number)
  {
    this.putInDashboard.emit(quan)
  }
  tookAssessment(aid:string)
  { 
     let dateTime = new Date()
     this.logAttendance.emit(dateTime.toString())
  }

}
