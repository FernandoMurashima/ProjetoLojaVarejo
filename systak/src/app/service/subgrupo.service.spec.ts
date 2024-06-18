import { TestBed } from '@angular/core/testing';

import { SubgrupoService } from './subgrupo.service';

describe('SubgrupoService', () => {
  let service: SubgrupoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubgrupoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
