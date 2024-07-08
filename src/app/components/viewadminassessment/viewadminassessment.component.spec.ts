import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewadminassessmentComponent } from './viewadminassessment.component';

describe('ViewadminassessmentComponent', () => {
  let component: ViewadminassessmentComponent;
  let fixture: ComponentFixture<ViewadminassessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewadminassessmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewadminassessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
