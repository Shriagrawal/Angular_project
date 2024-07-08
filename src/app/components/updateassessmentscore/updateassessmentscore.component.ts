import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-updateassessmentscore',
  templateUrl: './updateassessmentscore.component.html',
  styleUrl: './updateassessmentscore.component.scss'
})
export class UpdateassessmentscoreComponent {
  updateForm: FormGroup;

  constructor(private fb: FormBuilder) { this.updateForm = this.fb.group({
    assessment_name: ['', Validators.required],
    assessment_score: ['', Validators.required],
    questions: this.fb.array([])
  });

  // Pre-populate the form with existing data (example)
  this.loadAssessmentData(); }


  get questions() {
    return this.updateForm.get('questions') as FormArray;
  }

  addQuestion() {
    this.questions.push(this.fb.control('', Validators.required));
  }

  loadAssessmentData() {
    // const assessmentData = {
    //   assessment_name: 'Example Assessment',
    //   assessment_score: 85,
    //   questions: [20, 15, 25, 25]
    // };

    // this.updateForm.patchValue({
    //   assessment_name: assessmentData.assessment_name,
    //   assessment_score: assessmentData.assessment_score
    // });

    // assessmentData.questions.forEach(score => {
    //   this.questions.push(this.fb.control(score, Validators.required));
    // });
  }

  onSubmit() {
    if (this.updateForm.valid) {
      console.log(this.updateForm.value);
    }
  }

}
