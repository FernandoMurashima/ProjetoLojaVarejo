import { TestBed } from '@angular/core/testing';

import { ReceberitensService } from './receberitens.service';

describe('ReceberitensService', () => {
  let service: ReceberitensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceberitensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
