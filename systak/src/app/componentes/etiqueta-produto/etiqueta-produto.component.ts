import { Component } from '@angular/core';
import { EtiquetaService } from '../../service/etiqueta.service';
import JsBarcode from 'jsbarcode';

interface ProdutoDetalhe {
  Idprodutodetalhe: number;
  CodigodeBarra: string;
  Codigoproduto: string;
  descricao: string;
  tamanho: string;
  cor: string;
}

@Component({
  selector: 'app-etiqueta-produto',
  templateUrl: './etiqueta-produto.component.html',
  styleUrls: ['./etiqueta-produto.component.css'],
})
export class EtiquetaProdutoComponent {
  codigoBarra: string = '';
  produto: ProdutoDetalhe | null = null;
  quantidade: number = 1;

  constructor(private etiquetaService: EtiquetaService) {}

  buscarProduto() {
    console.log('Buscando produto para código de barra:', this.codigoBarra);
    this.etiquetaService.getProdutoDetalhe(this.codigoBarra).subscribe({
      next: (produto: ProdutoDetalhe) => {
        this.produto = produto;
        console.log('Produto recebido no componente:', produto);
        setTimeout(() => {
          this.gerarCodigoBarras();
        }, 100); // Aguarda o elemento estar disponível
      },
      error: (error: any) => {
        console.error('Erro ao buscar produto:', error);
      },
    });
  }

  gerarCodigoBarras() {
    if (this.produto) {
      JsBarcode('#barcode', this.produto.CodigodeBarra, {
        format: 'EAN13',
        displayValue: true,
      });
    }
  }

  imprimirEtiqueta() {
    if (this.produto) {
      const printContents = document.getElementById('etiqueta')?.innerHTML || '';
      const originalContents = document.body.innerHTML;

      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      location.reload(); // Opcional: recarregar para resetar a página
    }
  }
}
