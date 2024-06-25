import { Component, OnInit } from '@angular/core';
import { ColecaoService, Colecao } from '../../service/colecao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-colecao',
  templateUrl: './colecao.component.html',
  styleUrls: ['./colecao.component.css']
})
export class ColecaoComponent implements OnInit {
  colecao: Colecao = this.createEmptyColecao();
  colecoes: Colecao[] = [];
  colecaoSelecionada?: Colecao;
  action: string = '';

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private colecaoService: ColecaoService, private router: Router) {}

  ngOnInit(): void {
    this.loadColecoes();
  }

  createEmptyColecao(): Colecao {
    return {
      Idcolecao: 0,
      Descricao: '',
      Codigo: '',
      Status: '',
      data_cadastro: new Date()
    };
  }

  setAction(action: string) {
    this.action = action;
    if (action === 'consultar' || action === 'editar' || action === 'excluir') {
      this.loadColecoes();
    }
  }

  resetAction() {
    this.action = '';
    this.colecao = this.createEmptyColecao();
    this.colecaoSelecionada = undefined;
    this.successMessage = '';
    this.errorMessage = '';
  }

  goToIndex() {
    this.router.navigate(['/home']);
  }

  loadColecoes() {
    this.colecaoService.load().subscribe({
      next: (data) => {
        this.colecoes = data;
      },
      error: (error) => {
        console.error('Erro ao carregar coleções', error);
      }
    });
  }

  addColecao() {
    if (window.confirm('Confirma a inclusão da nova coleção?')) {
      const colecaoParaEnviar = {
        Descricao: this.colecao.Descricao,
        Codigo: this.colecao.Codigo,
        Status: this.colecao.Status,
        data_cadastro: this.colecao.data_cadastro
      };

      this.colecaoService.addColecao(colecaoParaEnviar).subscribe({
        next: (data) => {
          this.successMessage = 'Coleção adicionada com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          console.error('Erro ao cadastrar Coleção:', error);
          this.errorMessage = 'Erro ao cadastrar Coleção. Por favor, tente novamente.';
        }
      });
    }
  }

  onColecaoChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.colecaoSelecionada = this.colecoes.find(p => p.Idcolecao === +selectedId) ?? undefined;

    if (this.colecaoSelecionada) {
      this.colecao = { ...this.colecaoSelecionada };
    }
  }

  updateColecao() {
    if (window.confirm('Confirma a alteração da coleção?')) {
      if (!this.colecaoSelecionada) return;

      const colecaoParaEnviar = {
        ...this.colecao
      };
      this.colecaoService.updateColecao(this.colecaoSelecionada.Idcolecao, colecaoParaEnviar).subscribe({
        next: (data) => {
          this.successMessage = 'Coleção atualizada com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao atualizar Coleção. Por favor, tente novamente.';
        }
      });
    }
  }

  deleteColecao() {
    if (window.confirm('Confirma a exclusão da coleção?')) {
      if (!this.colecaoSelecionada) return;

      this.colecaoService.deleteColecao(this.colecaoSelecionada.Idcolecao).subscribe({
        next: (data) => {
          this.successMessage = 'Coleção excluída com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao excluir Coleção. Por favor, tente novamente.';
        }
      });
    }
  }
}
