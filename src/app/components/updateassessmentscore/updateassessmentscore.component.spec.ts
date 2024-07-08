import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateassessmentscoreComponent } from './updateassessmentscore.component';

describe('UpdateassessmentscoreComponent', () => {
  let component: UpdateassessmentscoreComponent;
  let fixture: ComponentFixture<UpdateassessmentscoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateassessmentscoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateassessmentscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
