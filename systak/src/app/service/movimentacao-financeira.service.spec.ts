import { TestBed } from '@angular/core/testing';

import { MovimentacaoFinanceiraService } from './movimentacao-financeira.service';

describe('MovimentacaoFinanceiraService', () => {
  let service: MovimentacaoFinanceiraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovimentacaoFinanceiraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
