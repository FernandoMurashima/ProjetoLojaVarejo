import { TestBed } from '@angular/core/testing';

import { GrupodetalheService } from './grupodetalhe.service';

describe('GrupodetalheService', () => {
  let service: GrupodetalheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupodetalheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
