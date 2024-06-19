import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAssessmentComponent } from './admin-assessment.component';

describe('AdminAssessmentComponent', () => {
  let component: AdminAssessmentComponent;
  let fixture: ComponentFixture<AdminAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAssessmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
