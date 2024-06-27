import { Component } from '@angular/core';
import { Attendance } from '../../models/attendance';
import { EventEmitterService } from '../../services/event-emitter.service';
import { AttendanceService } from '../../services/attendance.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.scss'
})
export class AttendanceComponent {
   arrAttendance : Attendance[] = []
   attItem : Attendance = new Attendance("",0,"","");
   constructor(private eventemitterservice:EventEmitterService,private attendanceservice:AttendanceService){
    this.eventemitterservice.logAttendance.subscribe(data=>{
      // const date = new Date();
      // this.attItem.assessmentDate = date
    })

    this.attendanceservice.getAttendance().subscribe(data=>{
      this.arrAttendance = data;
    })
  }
  AttendanceMarked(){
   console.log("le bhn ho gya ye bhi, tujhe hi krni thi na job..le karr")
  }
  deleteAssessment(aid:number){
    
  }
}
