import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Assessment } from '../../models/assessment';
import { AssessmentService } from '../../services/assessment.service';
import { Question } from '../../models/question';
import { QuestionService } from '../../services/question.service';
import { AttendanceService } from '../../services/attendance.service';
import { Attendance } from '../../models/attendance';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss'
})
export class QuestionsComponent {
  assId: number = 0;
  assItem: Assessment = new Assessment("", true, 0, 0, "", "", 0, [], "", 0);
  arrQuestions :Question[] = [];
  arrScore : number[] = [];
  tempAttendance : Attendance = new Attendance("",0,"","");

  questionsForm = this._formBuilder.group({
    answer: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder, private activatedroute: ActivatedRoute, public asservice: AssessmentService,public questionservice:QuestionService,public attendanceservice:AttendanceService,public localstorageservice:LocalStorageService) {
    this.activatedroute.params.subscribe((params: Params) => {
      console.log(params['id']);
      this.assId = params['id'];
    })
    this.asservice.getAssessmentbyId(this.assId).subscribe(data => {
      this.assItem = data;
      for(var i=0;i<this.assItem.question.length;i++)
        {
              const qid = this.assItem.question[i];
              this.questionservice.getQuestionsbyId(qid).subscribe(data=>{
                 this.arrQuestions.push(data);
              })
        }
    })
      // console.log(this.arrQuestions[0].qText + " ye rahe aapke questions lo");
  }
  //mere pass ass.question hai jispar loop karenge too question ids milenge jo fetch karke ek local array mein daldenge..or us local array ko loop karke vo questions steeper form mein dikhenge
  onSubmit() {
    this.tempAttendance.assessmentDate = (new Date()).toString();
    this.tempAttendance.assessmentId = this.assId;
    this.tempAttendance.userId = this.localstorageservice.getUserId()
    this.attendanceservice.addAttendance(this.tempAttendance).subscribe(data=>{
      console.log(data+"attendance marked");
    })
    alert("congratulations! you have submitted the assignment successfully and have been marked for the same")
  }
  nextClicked(frmvalue:any,qid:number){
    console.log(frmvalue.answer)
    var chhosedAnswer = frmvalue.answer;
    console.log(chhosedAnswer);
     this.questionservice.getQuestionsbyId(qid).subscribe(data=>{
        var q = data;
        var ans = q.answer;
        if(frmvalue.answer == ans)
          {
            this.arrScore.push(1);
            console.log("correct answer")
          }
          else{
            this.arrScore.push(0);
            console.log("wrong answer")
          }
     })
            
  }


}
