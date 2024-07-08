import { Component, OnInit } from '@angular/core';
import { TabelaPrecoService, TabelaPreco } from '../../service/tabela-preco.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabela-preco',
  templateUrl: './tabela-preco.component.html',
  styleUrls: ['./tabela-preco.component.css']
})
export class TabelaPrecoComponent implements OnInit {
  tabelaPreco: TabelaPreco = this.createEmptyTabelaPreco();
  tabelasPreco: TabelaPreco[] = [];
  tabelaPrecoSelecionada?: TabelaPreco;
  action: string = '';

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private tabelaPrecoService: TabelaPrecoService, private router: Router) {}

  ngOnInit(): void {
    this.loadTabelasPreco();
  }

  createEmptyTabelaPreco(): TabelaPreco {
    return {
      Idtabela: 0,
      NomeTabela: '',
      DataInicio: new Date(),
      DataFim: new Date(),
      Promocao: '',
      data_cadastro: new Date()
    };
  }

  setAction(action: string) {
    this.action = action;
    if (action === 'consultar' || action === 'editar' || action === 'excluir') {
      this.loadTabelasPreco();
    }
  }

  resetAction() {
    this.action = '';
    this.tabelaPreco = this.createEmptyTabelaPreco();
    this.tabelaPrecoSelecionada = undefined;
    this.successMessage = '';
    this.errorMessage = '';
  }

  goToIndex() {
    this.router.navigate(['/home']);
  }

  loadTabelasPreco() {
    this.tabelaPrecoService.load().subscribe({
      next: (data) => {
        this.tabelasPreco = data;
      },
      error: (error) => {
        console.error('Erro ao carregar tabelas de preço', error);
      }
    });
  }

  addTabelaPreco() {
    if (window.confirm('Confirma a inclusão da nova tabela de preço?')) {
      const tabelaParaEnviar = {
        NomeTabela: this.tabelaPreco.NomeTabela,
        DataInicio: this.tabelaPreco.DataInicio,
        DataFim: this.tabelaPreco.DataFim,
        Promocao: this.tabelaPreco.Promocao,
        data_cadastro: this.tabelaPreco.data_cadastro
      };

      this.tabelaPrecoService.addTabelaPreco(tabelaParaEnviar).subscribe({
        next: (data) => {
          this.successMessage = 'Tabela de preço adicionada com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          console.error('Erro ao cadastrar tabela de preço:', error);
          this.errorMessage = 'Erro ao cadastrar tabela de preço. Por favor, tente novamente.';
        }
      });
    }
  }

  onTabelaChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.tabelaPrecoSelecionada = this.tabelasPreco.find(p => p.Idtabela === +selectedId) ?? undefined;

    if (this.tabelaPrecoSelecionada) {
      this.tabelaPreco = { ...this.tabelaPrecoSelecionada };
    }
  }

  updateTabelaPreco() {
    if (window.confirm('Confirma a alteração da tabela de preço?')) {
      if (!this.tabelaPrecoSelecionada) return;

      const tabelaParaEnviar = {
        ...this.tabelaPreco
      };
      this.tabelaPrecoService.updateTabelaPreco(this.tabelaPrecoSelecionada.Idtabela, tabelaParaEnviar).subscribe({
        next: (data) => {
          this.successMessage = 'Tabela de preço atualizada com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao atualizar tabela de preço. Por favor, tente novamente.';
        }
      });
    }
  }

  deleteTabelaPreco() {
    if (window.confirm('Confirma a exclusão da tabela de preço?')) {
      if (!this.tabelaPrecoSelecionada) return;

      this.tabelaPrecoService.deleteTabelaPreco(this.tabelaPrecoSelecionada.Idtabela).subscribe({
        next: (data) => {
          this.successMessage = 'Tabela de preço excluída com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao excluir tabela de preço. Por favor, tente novamente.';
        }
      });
    }
  }
}
