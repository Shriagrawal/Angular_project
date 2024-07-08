import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewassessmentscoreComponent } from './viewassessmentscore.component';

describe('ViewassessmentscoreComponent', () => {
  let component: ViewassessmentscoreComponent;
  let fixture: ComponentFixture<ViewassessmentscoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewassessmentscoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewassessmentscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
