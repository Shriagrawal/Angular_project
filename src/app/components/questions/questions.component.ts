import { Component, OnInit, OnDestroy } from '@angular/core';
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

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
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
  timer: any;
  timeLeft: number = 0;

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
      this.timeLeft = this.assItem.assessmentTime; 
      for (var i = 0; i < this.assItem.question.length; i++) {
        const qid = this.assItem.question[i];
        this.questionservice.getQuestionsbyId(qid).subscribe(data => {
          this.arrQuestions.push(data);
        });
      }
      // this.startTimer();
    });
  }

  // ngOnDestroy() {
  //   if (this.timer) {
  //     clearInterval(this.timer);
  //   }
  // }

  // startTimer() {
  //   this.timer = setInterval(() => {
  //     if (this.timeLeft > 0) {
  //       this.timeLeft--;
  //     } else {
  //       this.onSubmit();
  //     }
  //   }, 1000);
  // }

  // resetTimer() {
  //   if (this.timer) {
  //     clearInterval(this.timer);
  //   }
  //   this.timeLeft = this.assItem.assessmentTime;
  //   this.startTimer();
  // }

  onSubmit() {
    // if (this.timer) {
    //   clearInterval(this.timer);
    // }
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
}
