import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddassessmentscoreComponent } from './addassessmentscore.component';

describe('AddassessmentscoreComponent', () => {
  let component: AddassessmentscoreComponent;
  let fixture: ComponentFixture<AddassessmentscoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddassessmentscoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddassessmentscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
