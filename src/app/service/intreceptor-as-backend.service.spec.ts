import { TestBed } from '@angular/core/testing';

import { IntreceptorAsBackendService } from './intreceptor-as-backend.service';

describe('IntreceptorAsBackendService', () => {
  let service: IntreceptorAsBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntreceptorAsBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
