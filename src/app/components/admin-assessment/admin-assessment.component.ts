import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from '../../models/question';
import { Assessment } from '../../models/assessment';
import { LocalStorageService } from '../../services/local-storage.service';
import { AssessmentService } from '../../services/assessment.service';
import { QuestionService } from '../../services/question.service';
import { map } from 'rxjs';

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
  userId : string = "0";
  maxId : string = "0";
  max_id : string = "0";
  tempQuesArr : Question[] = []
  tempAssessment : Assessment = new Assessment("",true,"",0,"",0,0,[],"",0)

  constructor(private _formBuilder: FormBuilder,private localstorageservice:LocalStorageService,public AssessmentService:AssessmentService,private questionservices:QuestionService) {
    this.questionsForm = this._formBuilder.group({
      arrQuestion: this._formBuilder.array([this.createQuestionFormGroup()])
    });
    
    this.AssessmentService.getAssessment().pipe(
      map(data => {
        const ids = data.map(assessment => parseInt(assessment.id, 10)); // Convert to numbers
        const maxId = Math.max(...ids, 0); // Find the maximum ID
        return (maxId + 1).toString(); // Increment and convert back to string
      })
    ).subscribe(newMaxId => {
      this.maxId = newMaxId;
    });

    this.questionservices.getQuestion().pipe(
      map(
        data => {
          const ids = data.map(question => (question.id,10));
          const max_ID = Math.max(...ids,0);
          return(max_ID+1).toString();
        }
      )
    ).subscribe(newMaxId => {
      this.max_id = newMaxId;
    });

    this.firstFormGroup = this._formBuilder.group({
      titleCtrl: ['', Validators.required],
      marksCtrl:['', Validators.required],
      dateCtrl : ['', Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      quesionCtrl: ['', Validators.required],
    });

    this.userId = this.localstorageservice.getUserId()

  }

  createNewAssessment(formdata : any)
  {
       this.tempAssessment.assessmentName = formdata.titleCtrl;
       this.tempAssessment.price = JSON.parse(formdata.marksCtrl);
       this.tempAssessment.facultyid = JSON.parse(this.userId);
       this.tempAssessment.flag = true;
       this.tempAssessment.id = this.maxId
       
      this.AssessmentService.addAssessment(this.tempAssessment).subscribe(data=>{
      // alert("Assessment has been added");
      })
       console.log(this.tempAssessment);
  }
  saveQuestions(formdata: any) {
    const questions = formdata.arrQuestion.map((questionFormGroup: any) => {
      return {
        id: this.max_id, 
        question: questionFormGroup.quesionCtrl,
        answer: questionFormGroup.answerCtrl,
        type: questionFormGroup.typeCtrl,
        options: [] 
      };
    });
  
    questions.forEach((formattedQuestion : any, index:any) => {
      formattedQuestion.id = (index + 1).toString(); 
      this.tempQuesArr.push(formattedQuestion);
    });
  
    console.log(this.tempQuesArr); 
  }
  
  private createQuestionFormGroup(): FormGroup {
    return this._formBuilder.group({
      quesionCtrl: ['', Validators.required],
      answerCtrl: ['', Validators.required],
      typeCtrl: ['', Validators.required]
    });
  }

  AddQuestionFormGroup() {
    // const questionGroup = this.questionsForm.get('arrQuestion') as FormArray;
    // questionGroup.push(this.createQuestionFormGroup());
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

  reset(){
    
  }
}
