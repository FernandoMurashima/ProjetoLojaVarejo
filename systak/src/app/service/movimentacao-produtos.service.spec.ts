import { TestBed } from '@angular/core/testing';

import { MovimentacaoProdutosService } from './movimentacao-produtos.service';

describe('MovimentacaoProdutosService', () => {
  let service: MovimentacaoProdutosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovimentacaoProdutosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
