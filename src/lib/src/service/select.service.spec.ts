import { TestBed, inject } from '@angular/core/testing';

import { SelectService } from './select.service';

describe('SelectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectService]
    });
  });

  it('should create service', inject([SelectService], (service: SelectService) => {
    expect(service).toBeTruthy();
  }));
});
