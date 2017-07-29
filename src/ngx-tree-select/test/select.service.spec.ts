import { inject, TestBed } from '@angular/core/testing';
import { SelectService } from '../src/services/select.service';

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
