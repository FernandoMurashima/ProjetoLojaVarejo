import { TestBed } from '@angular/core/testing';

import { ReceberService } from './receber.service';

describe('ReceberService', () => {
  let service: ReceberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
