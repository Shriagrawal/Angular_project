import { TestBed } from '@angular/core/testing';

import { AddToDashboardService } from './add-to-dashboard.service';

describe('AddToDashboardService', () => {
  let service: AddToDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddToDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
