import { TestBed } from '@angular/core/testing';

import { DodoService } from './dodo.service';

describe('DodoService', () => {
  let service: DodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
