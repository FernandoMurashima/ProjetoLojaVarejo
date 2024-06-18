import { Component, OnInit } from '@angular/core';
import { ProdutoService, Produto } from '../../service/produto.service';
import { GrupoService, Grupo } from '../../service/grupo.service';
import { SubgrupoService, Subgrupo } from '../../service/subgrupo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {
  produto: Produto = this.createEmptyProduto();
  produtos: Produto[] = [];
  grupos: Grupo[] = [];
  subgrupos: Subgrupo[] = [];
  produtoSelecionado?: Produto;
  action: string = '';

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private produtoService: ProdutoService,
    private grupoService: GrupoService,
    private subgrupoService: SubgrupoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProdutos();
    this.loadGrupos();
  }

  createEmptyProduto(): Produto {
    return {
      Tipoproduto: '',
      Descricao: '',
      Desc_reduzida: '',
      classificacao_fiscal: '',
      unidade: '',
      grupo: '',
      subgrupo: '',
      familia: '',
      grade: '',
      colecao: '',
      produto_foto: '',
      Material: '',
      data_cadastro: new Date()
    };
  }

  setAction(action: string) {
    console.log('Ação definida:', action);
    this.action = action;
    if (action === 'consultar' || action === 'editar' || action === 'excluir') {
      this.loadProdutos();
    }
  }

  resetAction() {
    this.action = '';
    this.produto = this.createEmptyProduto();
    this.produtoSelecionado = undefined;
    this.successMessage = '';
    this.errorMessage = '';
    this.subgrupos = [];
  }

  goToIndex() {
    this.router.navigate(['/home']);
  }

  loadProdutos() {
    this.produtoService.load().subscribe({
      next: (data: Produto[]) => {
        this.produtos = data;
      },
      error: (error: any) => {
        console.error('Erro ao carregar produtos', error);
      }
    });
  }

  loadGrupos() {
    this.grupoService.load().subscribe({
      next: (data: Grupo[]) => {
        this.grupos = data;
      },
      error: (error: any) => {
        console.error('Erro ao carregar grupos', error);
      }
    });
  }

  loadSubgrupos(idgrupo: string) {
    this.subgrupoService.loadByGrupo(idgrupo).subscribe({
      next: (data: Subgrupo[]) => {
        this.subgrupos = data;
      },
      error: (error: any) => {
        console.error('Erro ao carregar subgrupos', error);
      }
    });
  }

  addProduto() {
    if (window.confirm('Confirma a inclusão do novo produto?')) {
      const produtoParaEnviar = { ...this.produto };
      delete produtoParaEnviar.Idproduto; // Remova o Idproduto antes de enviar

      console.log("Dados do produto para envio:", produtoParaEnviar);
      this.produtoService.addProduto(produtoParaEnviar).subscribe({
        next: (data: Produto) => {
          this.successMessage = 'Produto adicionado com sucesso!';
          this.resetAction();
        },
        error: (error: any) => {
          console.error('Erro ao cadastrar produto:', error);
          this.errorMessage = 'Erro ao cadastrar produto. Por favor, tente novamente.';
        }
      });
    }
  }

  updateProduto() {
    if (window.confirm('Confirma a alteração do produto?')) {
      if (!this.produtoSelecionado) return;

      const produtoParaEnviar = { ...this.produto };
      this.produtoService.updateProduto(this.produtoSelecionado.Idproduto!, produtoParaEnviar).subscribe({
        next: (data: Produto) => {
          this.successMessage = 'Produto atualizado com sucesso!';
          this.resetAction();
        },
        error: (error: any) => {
          this.errorMessage = 'Erro ao atualizar produto. Por favor, tente novamente.';
        }
      });
    }
  }

  deleteProduto() {
    if (window.confirm('Confirma a exclusão do produto?')) {
      if (!this.produtoSelecionado) return;

      this.produtoService.deleteProduto(this.produtoSelecionado.Idproduto!).subscribe({
        next: (data: any) => {
          this.successMessage = 'Produto excluído com sucesso!';
          this.resetAction();
        },
        error: (error: any) => {
          this.errorMessage = 'Erro ao excluir produto. Por favor, tente novamente.';
        }
      });
    }
  }

  onProdutoChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.produtoSelecionado = this.produtos.find(p => p.Idproduto === +selectedId) ?? undefined;

    if (this.produtoSelecionado) {
      this.produto = { ...this.produtoSelecionado };
      this.loadSubgrupos(this.produtoSelecionado.grupo!);
    }
  }

  onGrupoChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.loadSubgrupos(selectedId);
  }
}
