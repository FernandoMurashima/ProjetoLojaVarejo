import { Component, OnInit } from '@angular/core';
import { ProdutoService, ProdutoDetalhe } from '../../service/produto.service';
import { TabelaPrecoService, TabelaPreco } from '../../service/tabela-preco.service';
import { TabelaPrecoItemService, TabelaPrecoItem } from '../../service/tabela-precoitem.service';
import { LojaService, Loja } from '../../service/loja.service';
import { EstoqueService, Estoque } from '../../service/estoque.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'; // Importar Router

@Component({
  selector: 'app-estoque-inicial',
  templateUrl: './estoque-inicial.component.html',
  styleUrls: ['./estoque-inicial.component.css']
})
export class EstoqueInicialComponent implements OnInit {
  referencia: string = '';
  tabelaPreco: number = 0;
  preco: number = 0;
  tabelasPreco: TabelaPreco[] = [];
  lojas: Loja[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private produtoService: ProdutoService,
    private tabelaPrecoService: TabelaPrecoService,
    private tabelaPrecoItemService: TabelaPrecoItemService,
    private lojaService: LojaService,
    private estoqueService: EstoqueService,
    private router: Router // Injetar Router
  ) {}

  ngOnInit(): void {
    this.loadTabelasPreco();
    this.loadLojas();
  }

  loadTabelasPreco() {
    this.tabelaPrecoService.load().subscribe({
      next: (data: TabelaPreco[]) => {
        this.tabelasPreco = data;
      },
      error: (error: any) => {
        console.error('Erro ao carregar tabelas de preço', error);
      }
    });
  }

  loadLojas() {
    this.lojaService.load().subscribe({
      next: (data: Loja[]) => {
        this.lojas = data;
      },
      error: (error: any) => {
        console.error('Erro ao carregar lojas', error);
      }
    });
  }

  iniciarEstoque() {
    this.produtoService.getDetalhesByReferencia(this.referencia).subscribe({
      next: async (detalhes: ProdutoDetalhe[]) => {
        for (const detalhe of detalhes) {
          await this.processarTabelaPrecoItem(detalhe);
          await this.processarEstoque(detalhe);
        }
        this.successMessage = 'Estoque inicializado com sucesso!';
        this.errorMessage = '';
      },
      error: (error: HttpErrorResponse) => {
        console.error('Erro ao buscar detalhes do produto', error);
        this.errorMessage = 'Erro ao buscar detalhes do produto. Por favor, tente novamente.';
        this.successMessage = '';
      }
    });
  }

  async processarTabelaPrecoItem(detalhe: ProdutoDetalhe) {
    try {
      const existe = await this.tabelaPrecoItemService.exists(detalhe.CodigodeBarra, detalhe.Codigoproduto, this.tabelaPreco).toPromise();
      if (!existe) {
        const tabelaPrecoItem: TabelaPrecoItem = {
          codigoproduto: detalhe.Codigoproduto,
          codigodebarra: detalhe.CodigodeBarra,
          preco: this.preco,
          idtabela: this.tabelaPreco
        };
        await this.tabelaPrecoItemService.addTabelaPrecoItem(tabelaPrecoItem).toPromise();
      }
    } catch (error) {
      console.error('Erro ao processar item da tabela de preço', error);
    }
  }

  async processarEstoque(detalhe: ProdutoDetalhe) {
    try {
      for (const loja of this.lojas) {
        const existe = await this.estoqueService.exists(detalhe.CodigodeBarra, detalhe.Codigoproduto, loja.Idloja).toPromise();
        if (!existe) {
          const estoque: Estoque = {
            CodigodeBarra: detalhe.CodigodeBarra,
            codigoproduto: detalhe.Codigoproduto,
            Idloja: loja.Idloja,
            Estoque: 0,
            reserva: 0,
            valorestoque: 0
          };
          await this.estoqueService.addEstoque(estoque).toPromise();
        }
      }
    } catch (error) {
      console.error('Erro ao processar estoque', error);
    }
  }

  voltar() {
    this.router.navigate(['/home']); // Navegar para a página inicial ou outra rota desejada
  }
}
