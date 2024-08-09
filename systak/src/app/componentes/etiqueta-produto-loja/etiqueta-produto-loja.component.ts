import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'app-etiqueta-produto-loja',
  templateUrl: './etiqueta-produto-loja.component.html',
  styleUrls: ['./etiqueta-produto-loja.component.css'],
})
export class EtiquetaProdutoLojaComponent implements OnInit {
  produtos: ProdutoDetalhe[] = [];
  colecaoId: number | undefined;
  colecoes: any[] = [];

  constructor(private etiquetaService: EtiquetaService, private router: Router) {}

  ngOnInit(): void {
    this.carregarColecoes();
  }

  carregarColecoes() {
    this.etiquetaService.getColecoes().subscribe({
      next: (colecoes: any[]) => {
        this.colecoes = colecoes;
        console.log('Coleções carregadas:', this.colecoes);
      },
      error: (error: any) => {
        console.error('Erro ao carregar coleções:', error);
      },
    });
  }

  buscarProdutosPorColecao() {
    console.log('Coleção selecionada antes da validação:', this.colecaoId);
    if (this.colecaoId) {
      console.log('ID da coleção selecionada (válida):', this.colecaoId);
      this.etiquetaService.getProdutosPorColecao(this.colecaoId).subscribe({
        next: (produtos: ProdutoDetalhe[]) => {
          this.produtos = produtos;
          console.log('Produtos recebidos:', this.produtos);
          setTimeout(() => {
            this.gerarCodigosBarras();
          }, 100);
        },
        error: (error: any) => {
          console.error('Erro ao buscar produtos:', error);
        },
      });
    } else {
      console.error('Nenhuma coleção selecionada!');
    }
  }

  gerarCodigosBarras() {
    this.produtos.forEach((produto, index) => {
      JsBarcode(`#barcode-${index}`, produto.CodigodeBarra, {
        format: 'EAN13',
        displayValue: true,
      });
    });
  }

  imprimirEtiquetas() {
    setTimeout(() => {
      window.print();
    }, 500); // Um pequeno atraso para garantir que tudo esteja renderizado
  }
  

  voltar() {
    this.router.navigate(['/home']);
  }
}
