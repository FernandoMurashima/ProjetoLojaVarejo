import { TestBed } from '@angular/core/testing';

import { TabelaPrecoitemService } from './tabela-precoitem.service';

describe('TabelaPrecoitemService', () => {
  let service: TabelaPrecoitemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabelaPrecoitemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
