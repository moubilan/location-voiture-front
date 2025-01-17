import { TestBed } from '@angular/core/testing';

import { DashboardcarService } from './dashboardcar.service';

describe('DashboardcarService', () => {
  let service: DashboardcarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardcarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
