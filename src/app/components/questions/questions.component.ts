import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Assessment } from '../../models/assessment';
import { AssessmentService } from '../../services/assessment.service';
import { Question } from '../../models/question';
import { QuestionService } from '../../services/question.service';
import { AttendanceService } from '../../services/attendance.service';
import { Attendance } from '../../models/attendance';
import { LocalStorageService } from '../../services/local-storage.service';
import { AssessmetScoresService } from '../../services/assessmet-scores.service';
import { AssessmentScores } from '../../models/assessmentscores';
import { MatStepper } from '@angular/material/stepper';
import { CountdownComponent } from 'ngx-countdown';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  @ViewChild('countdown', { static: false }) private countdown!: CountdownComponent;
  assId: number = 0;
  assItem: Assessment = new Assessment("", true, "", 0, "", 0, 0, [], "", 0);
  arrQuestions: Question[] = [];
  arrScore: number[] = [];
  tempAttendance: Attendance = new Attendance("", "", 0, "", "");
  tempAssessmentScore: AssessmentScores = new AssessmentScores(0, 0, 0, 0, []);
  userId: number = 0;
  questionsForm = this._formBuilder.group({
    answer: ['', Validators.required],
  });
  isLinear = false;
  constructor(
    private _formBuilder: FormBuilder,
    private activatedroute: ActivatedRoute,
    public asservice: AssessmentService,
    public questionservice: QuestionService,
    public attendanceservice: AttendanceService,
    public localstorageservice: LocalStorageService,
    private assessmentscoreservice: AssessmetScoresService
  ) {
    this.activatedroute.params.subscribe((params: Params) => {
      this.assId = params['id'];
    });
    this.userId = JSON.parse(this.localstorageservice.getUserId());
  }

  ngOnInit() {
    this.asservice.getAssessmentbyId(this.assId).subscribe(data => {
      this.assItem = data;
      for (var i = 0; i < this.assItem.question.length; i++) {
        const qid = this.assItem.question[i];
        this.questionservice.getQuestionsbyId(qid).subscribe(data => {
          this.arrQuestions.push(data);
        });
      }
    });

  }



  onSubmit() {   
    this.tempAttendance.assessmentDate = new Date().toString();
    this.tempAttendance.assessmentId = this.assId;
    this.tempAttendance.userId = this.localstorageservice.getUserId();
    this.tempAttendance.id = this.localstorageservice.getUserId();
    this.attendanceservice.addAttendance(this.tempAttendance).subscribe(data => {
      console.log(data + " attendance marked");
    });
    this.tempAssessmentScore.ScoreArr = this.arrScore;
    this.tempAssessmentScore.assessmentId = this.assId;
    this.tempAssessmentScore.id = this.userId;
    this.tempAssessmentScore.traineeId = this.userId;
    for (var i = 0; i < this.tempAssessmentScore.ScoreArr.length; i++) {
      this.tempAssessmentScore.score += this.tempAssessmentScore.ScoreArr[i];
    }
    this.assessmentscoreservice.addAssessmentScore(this.tempAssessmentScore).subscribe(data => {
      console.log("assessmentScore has been added" + data);
    });
    alert("Congratulations! You have submitted the assignment successfully and have been marked for the same.");
  }

  nextClicked(frmvalue: any, qid: number) {
    var chosenAnswer = frmvalue.answer;
    this.questionservice.getQuestionsbyId(qid).subscribe(data => {
      var q = data;
      var ans = q.answer;
      if (chosenAnswer == ans) {
        this.arrScore.push(1);
        console.log("correct answer");
      } else {
        this.arrScore.push(0);
        console.log("wrong answer");
      }
    });
  }
  onStepChange() {
    this.resetCountdown();
  }

  resetStepper(stepper: MatStepper, countdown: CountdownComponent) {
    stepper.reset();
    this.resetCountdown();
  }

  resetCountdown() {
    this.countdown.config.leftTime = this.assItem.assessmentTime;
    this.countdown.restart();
  }

  onCountdownFinished(){   
    this.tempAttendance.assessmentDate = new Date().toString();
    this.tempAttendance.assessmentId = this.assId;
    this.tempAttendance.userId = this.localstorageservice.getUserId();
    this.tempAttendance.id = this.localstorageservice.getUserId();
    this.attendanceservice.addAttendance(this.tempAttendance).subscribe(data => {
      console.log(data + " attendance marked");
    });
    this.tempAssessmentScore.ScoreArr = this.arrScore;
    this.tempAssessmentScore.assessmentId = this.assId;
    this.tempAssessmentScore.id = this.userId;
    this.tempAssessmentScore.traineeId = this.userId;
    for (var i = 0; i < this.tempAssessmentScore.ScoreArr.length; i++) {
      this.tempAssessmentScore.score += this.tempAssessmentScore.ScoreArr[i];
    }
    this.assessmentscoreservice.addAssessmentScore(this.tempAssessmentScore).subscribe(data => {
      console.log("assessmentScore has been added" + data);
    });
    alert("Congratulations! You have submitted the assignment successfully and have been marked for the same.");
  }

}
