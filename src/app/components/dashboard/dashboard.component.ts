import { Component } from '@angular/core';
import { userDashboard } from '../../models/userDashboard';
import { AddToDashboardService } from '../../services/add-to-dashboard.service';
import { Router } from '@angular/router';
import { EventEmitterService } from '../../services/event-emitter.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
   dashboardItem : userDashboard = new userDashboard("","",[],[],0,0);
   
   constructor(private dashboardservice:AddToDashboardService,public router:Router,public eventemitterservice:EventEmitterService,private localstorageservice:LocalStorageService){
    const userId = localstorageservice.getUserId()
    
    this.dashboardservice.getDashboardbyId(JSON.parse(userId)).subscribe(data=>{
      console.log(data + " : dashboard ka data hai ye")
      this.dashboardItem = data
    })
   }

   takeAssessment(aid:number){
         //quantity of this ass should decrease from the dashboard of this user
         const userId = this.localstorageservice.getUserId();
         this.dashboardservice.getDashboardbyId(JSON.parse(userId))

         this.eventemitterservice.tookAssessment(aid.toString())
         this.router.navigate(['assessmentQuestions/'+aid])
   }
}
