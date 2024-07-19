import { Component, OnInit } from '@angular/core';
import { ProdutoService, ProdutoDetalhe } from '../../service/produto.service';

@Component({
  selector: 'app-teste-produto',
  templateUrl: './teste-produto.component.html',
  styleUrls: ['./teste-produto.component.css']
})
export class TesteProdutoComponent implements OnInit {
  codigoBarra: string = '789123401542'; // Substitua pelo novo código de barras
  produtoDetalhe: ProdutoDetalhe | null = null;

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.testBuscarPorCodigoBarra();
  }

  testBuscarPorCodigoBarra() {
    this.produtoService.buscarPorCodigoBarra(this.codigoBarra).subscribe(data => {
      this.produtoDetalhe = data;
      console.log('ProdutoDetalhe encontrado:', this.produtoDetalhe);
    }, error => {
      console.error('Erro ao buscar ProdutoDetalhe:', error);
    });
  }
}


