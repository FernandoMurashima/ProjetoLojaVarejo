import { TestBed } from '@angular/core/testing';

import { TiposdesubgrupoService } from './tiposdesubgrupo.service';

describe('TiposdesubgrupoService', () => {
  let service: TiposdesubgrupoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposdesubgrupoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
