import { TestBed } from '@angular/core/testing';

import { AiDataService } from './aidata.service';

describe('AiDataService', () => {
  let service: AiDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
