import { TestBed } from '@angular/core/testing';

import { NatLancamentoService } from './nat-lancamento.service';

describe('NatLancamentoService', () => {
  let service: NatLancamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NatLancamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
