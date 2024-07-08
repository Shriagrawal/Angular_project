import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addassessmentscore',
  templateUrl: './addassessmentscore.component.html',
  styleUrl: './addassessmentscore.component.scss'
})
export class AddassessmentscoreComponent {
  assessmentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.assessmentForm = this.fb.group({
      assessment_name: ['', Validators.required],
      assessment_score: ['', Validators.required],
      questions: this.fb.array([])
    });
   }

  get questions() {
    return this.assessmentForm.get('questions') as FormArray;
  }

  addQuestion() {
    this.questions.push(this.fb.control('', Validators.required));
  }

  onSubmit() {
    if (this.assessmentForm.valid) {
      console.log(this.assessmentForm.value);
    }
  }

}
