import { Component, OnInit } from '@angular/core';
import { ColecaoService, Colecao } from '../../service/colecao.service';

export type ColecaoCreate = Omit<Colecao, 'Idcolecao'>; // Adicionando a definição de ColecaoCreate

@Component({
  selector: 'app-colecao',
  templateUrl: './colecao.component.html',
  styleUrls: ['./colecao.component.css']
})
export class ColecaoComponent implements OnInit {
  colecao: Colecao = this.createEmptyColecao();
  colecoes: Colecao[] = [];
  colecaoSelecionada?: Colecao; // Adicionando a propriedade
  action: string = ''; // Adicionando a propriedade
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private colecaoService: ColecaoService) {}

  ngOnInit(): void {
    this.loadColecoes();
  }

  createEmptyColecao(): Colecao {
    return {
      Idcolecao: 0,
      Descricao: '',
      Codigo: '',
      Estacao: '', // Adicione esta linha
      Contador: 0, // Adicione esta linha
      Status: '',
      data_cadastro: new Date()
    };
  }

  setAction(action: string) {
    this.action = action;
    this.colecaoSelecionada = undefined;
    this.colecao = this.createEmptyColecao();
  }

  resetAction() {
    this.action = '';
    this.colecaoSelecionada = undefined;
    this.colecao = this.createEmptyColecao();
  }

  goToIndex() {
    // Adicione a navegação para a página inicial ou ajuste conforme necessário
    console.log('Voltar para o índice');
  }

  loadColecoes() {
    this.colecaoService.load().subscribe({
      next: (data: Colecao[]) => {
        this.colecoes = data;
      },
      error: (error: any) => {
        console.error('Erro ao carregar coleções', error);
      }
    });
  }

  addColecao() {
    const colecaoParaEnviar = {
      ...this.colecao,
      Idcolecao: undefined // Remova o Idcolecao antes de enviar
    } as ColecaoCreate;

    this.colecaoService.addColecao(colecaoParaEnviar).subscribe({
      next: (data: Colecao) => {
        this.successMessage = 'Coleção adicionada com sucesso!';
        this.loadColecoes();
        this.colecao = this.createEmptyColecao();
      },
      error: (error: any) => {
        console.error('Erro ao adicionar coleção', error);
        this.errorMessage = 'Erro ao adicionar coleção. Por favor, tente novamente.';
      }
    });
  }

  updateColecao() {
    if (!this.colecao.Idcolecao) return;

    this.colecaoService.updateColecao(this.colecao.Idcolecao, this.colecao).subscribe({
      next: (data: Colecao) => {
        this.successMessage = 'Coleção atualizada com sucesso!';
        this.loadColecoes();
      },
      error: (error: any) => {
        console.error('Erro ao atualizar coleção', error);
        this.errorMessage = 'Erro ao atualizar coleção. Por favor, tente novamente.';
      }
    });
  }

  deleteColecao() {
    if (!this.colecao.Idcolecao) return;

    this.colecaoService.deleteColecao(this.colecao.Idcolecao).subscribe({
      next: (data: any) => {
        this.successMessage = 'Coleção excluída com sucesso!';
        this.loadColecoes();
        this.colecao = this.createEmptyColecao();
      },
      error: (error: any) => {
        console.error('Erro ao excluir coleção', error);
        this.errorMessage = 'Erro ao excluir coleção. Por favor, tente novamente.';
      }
    });
  }

  onColecaoChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.colecaoSelecionada = this.colecoes.find(c => c.Idcolecao === +selectedId);

    if (this.colecaoSelecionada) {
      this.colecao = { ...this.colecaoSelecionada };
    }
  }
}
