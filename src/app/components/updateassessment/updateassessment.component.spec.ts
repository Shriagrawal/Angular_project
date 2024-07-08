import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateassessmentComponent } from './updateassessment.component';

describe('UpdateassessmentComponent', () => {
  let component: UpdateassessmentComponent;
  let fixture: ComponentFixture<UpdateassessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateassessmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateassessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
