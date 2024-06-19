import { TestBed } from '@angular/core/testing';

import { AssessmetScoresService } from './assessmet-scores.service';

describe('AssessmetScoresService', () => {
  let service: AssessmetScoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssessmetScoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
