import { TestBed } from '@angular/core/testing';

import { OptionDataService } from './option-data.service';

describe('OptionDataService', () => {
  let service: OptionDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OptionDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
