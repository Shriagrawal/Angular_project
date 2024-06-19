import { Component } from '@angular/core';
import { AssessmentService } from '../../services/assessment.service';
// import { Assessment } from '../../models/assessments';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']  
})
export class HomeComponent {
  //  arrAssessments : Assessment[] = []
  // constructor(private assessmentService:AssessmentService){
  //    this.arrAssessments = this.assessmentService.getAssessment()
  // }

  // isActive(active:string)
  // {
  //   if(active == "true")
  //     {
  //       return true;
  //     }
  //     else return false;
  // }

  // displayDetails(aid:number)
  // {
  //   console.log(aid)
  // }
  //  choice: number = 0;

  //  constructor() {}

  //  nextChoice(): void {
  //   this.choice += 1;

  //   if(this.choice > 5) {
  //     this.choice = 1;
  //   }
  //  }
  // isBordered : boolean=false
  // classObj = {
  //   bordered: false
  // };

  // classList: string[]=[];

  // constructor()
  // {
  //   this.isBordered = true;
  //   this.classList = ['blue','red'];
  //   this.toggleBorder();
  // }

  // toggleBorder() : void {
  //   this.isBordered = ! this.isBordered;

  //   this.classObj={
  //     bordered : this.isBordered
  //   }
  // }

}

