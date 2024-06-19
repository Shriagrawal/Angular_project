import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from '../../models/question';
import { Assessment } from '../../models/assessment';

@Component({
  selector: 'app-admin-assessment',
  templateUrl: './admin-assessment.component.html',
  styleUrls: ['./admin-assessment.component.scss']
})
export class AdminAssessmentComponent {
  public questionsForm: FormGroup;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  tempAssessment : Assessment = new Assessment("",true,0,0,"","",0,[])

  constructor(private _formBuilder: FormBuilder) {
    this.questionsForm = this._formBuilder.group({
      arrQuestion: this._formBuilder.array([this.createQuestionFormGroup()])
    });

    this.firstFormGroup = this._formBuilder.group({
      titleCtrl: ['', Validators.required],
      marksCtrl:['', Validators.required],
      dateCtrl : ['', Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      quesionCtrl: ['', Validators.required],
    });
  }

  createNewAssessment(formdata : any)
  {
       this.tempAssessment.assessmentName = formdata.titleCtrl;
       this.tempAssessment.assesmentDate = formdata.marksCtrl;
       console.log(this.tempAssessment);
  }


  saveQuestions(formdata: any) {
     this.tempAssessment.question = formdata.quesionCtrl
     console.log(this.tempAssessment)

  }

  private createQuestionFormGroup(): FormGroup {
    return this._formBuilder.group({
      quesionCtrl: ['', Validators.required],
      answerCtrl: ['', Validators.required],
      typeCtrl: ['', Validators.required]
    });
  }

  AddQuestionFormGroup() {
    const questionGroup = this.questionsForm.get('arrQuestion') as FormArray;
    questionGroup.push(this.createQuestionFormGroup());
  }

  RemoveQuestionFormGroup(index: number) {
    const questionGroup = this.questionsForm.get('arrQuestion') as FormArray;
    if (questionGroup.length > 1) {
      questionGroup.removeAt(index);
    } else {
      questionGroup.reset();
    }
  }

  QuestionsArray(): FormArray {
    return this.questionsForm.get('arrQuestion') as FormArray;
  }
}
