import { Component, OnInit } from '@angular/core';
import { ProdutoService, Produto } from '../../service/produto.service';
import { GrupoService, Grupo } from '../../service/grupo.service';
import { SubgrupoService, Subgrupo } from '../../service/subgrupo.service';
import { GradeService, Grade } from '../../service/grade.service'; // Serviço para grades
import { UnidadeService, Unidade } from '../../service/unidade.service'; // Serviço para unidades
import { ColecaoService, Colecao } from '../../service/colecao.service'; // Serviço para coleções
import { MaterialService, Material } from '../../service/material.service'; // Serviço para materiais
import { FamiliaService, Familia } from '../../service/familia.service'; // Serviço para famílias
import { NcmService, Ncm } from '../../service/ncm.service'; // Serviço para NCMs
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
  grades: Grade[] = []; // Array para armazenar grades
  unidades: Unidade[] = []; // Array para armazenar unidades
  colecoes: Colecao[] = []; // Array para armazenar coleções
  materiais: Material[] = []; // Array para armazenar materiais
  familias: Familia[] = []; // Array para armazenar famílias
  ncms: Ncm[] = []; // Array para armazenar NCMs
  produtoSelecionado?: Produto;
  action: string = '';

  successMessage: string = '';
  errorMessage: string = '';

  private readonly imageBasePath = 'assets/Imagens/';

  constructor(
    private produtoService: ProdutoService,
    private subgrupoService: SubgrupoService,
    private grupoService: GrupoService,
    private gradeService: GradeService, // Injeção do serviço de grades
    private unidadeService: UnidadeService, // Injeção do serviço de unidades
    private colecaoService: ColecaoService, // Injeção do serviço de coleções
    private materialService: MaterialService, // Injeção do serviço de materiais
    private familiaService: FamiliaService, // Injeção do serviço de famílias
    private ncmService: NcmService, // Injeção do serviço de NCMs
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProdutos();
    this.loadGrades(); // Carregar grades
    this.loadUnidades(); // Carregar unidades
    this.loadColecoes(); // Carregar coleções
    this.loadMateriais(); // Carregar materiais
    this.loadFamilias(); // Carregar famílias
    this.loadNcms(); // Carregar NCMs
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
      produto_foto1: '',
      produto_foto2: '',
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
        this.populateProdutoDescriptions();
      },
      error: (error: any) => {
        console.error('Erro ao carregar produtos', error);
      }
    });
  }

  populateProdutoDescriptions() {
    this.produtos.forEach(produto => {
      
      produto['gradeDescricao'] = this.grades.find(grade => grade.Idgrade.toString() === produto.grade)?.Descricao || '';
      produto['unidadeDescricao'] = this.unidades.find(unidade => unidade.Idunidade.toString() === produto.unidade)?.Descricao || '';
      produto['colecaoDescricao'] = this.colecoes.find(colecao => colecao.Idcolecao.toString() === produto.colecao)?.Descricao || '';
      produto['materialDescricao'] = this.materiais.find(material => material.Idmaterial.toString() === produto.Material)?.Descricao || '';
      produto['familiaDescricao'] = this.familias.find(familia => familia.Idfamilia.toString() === produto.familia)?.Descricao || '';
      produto['classificacaoFiscalDescricao'] = this.ncms.find(ncm => ncm.ncm === produto.classificacao_fiscal)?.descricao || '';
    });
  }

  

  
  // Método para carregar grades ativas
  loadGrades() {
    this.gradeService.loadActive().subscribe({
      next: (data: Grade[]) => {
        this.grades = data;
      },
      error: (error: any) => {
        console.error('Erro ao carregar grades', error);
      }
    });
  }

  // Método para carregar unidades
  loadUnidades() {
    this.unidadeService.load().subscribe({
      next: (data: Unidade[]) => {
        this.unidades = data;
      },
      error: (error: any) => {
        console.error('Erro ao carregar unidades', error);
      }
    });
  }

  // Método para carregar coleções
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

  // Método para carregar materiais ativos
  loadMateriais() {
    this.materialService.loadActive().subscribe({
      next: (data: Material[]) => {
        this.materiais = data;
      },
      error: (error: any) => {
        console.error('Erro ao carregar materiais', error);
      }
    });
  }

  // Método para carregar famílias
  loadFamilias() {
    this.familiaService.load().subscribe({
      next: (data: Familia[]) => {
        this.familias = data;
      },
      error: (error: any) => {
        console.error('Erro ao carregar famílias', error);
      }
    });
  }

  // Método para carregar NCMs
  loadNcms() {
    this.ncmService.load().subscribe({
      next: (data: Ncm[]) => {
        this.ncms = data;
      },
      error: (error: any) => {
        console.error('Erro ao carregar NCMs', error);
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
      if (!this.produtoSelecionado || this.produtoSelecionado.Idproduto === undefined) return;

      const produtoParaEnviar = { ...this.produto };
      this.produtoService.updateProduto(this.produtoSelecionado.Idproduto, produtoParaEnviar).subscribe({
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
      if (!this.produtoSelecionado || this.produtoSelecionado.Idproduto === undefined) return;

      this.produtoService.deleteProduto(this.produtoSelecionado.Idproduto).subscribe({
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
    }
  }

  onGrupoChange(event: Event) {
    const selectedId = +(event.target as HTMLSelectElement).value; // Alteração: conversão para number adicionada
    
  }

  onFotoChange(field: string, event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.value) {
      this.produto[field] = input.value;
    }
  }

  prefixImagePath(field: string) {
    if (this.produto[field] && !this.produto[field].startsWith(this.imageBasePath)) {
      this.produto[field] = `${this.imageBasePath}${this.produto[field]}`;
    }
  }

  onClassificacaoFiscalChange(event: Event) {
    const selectedNcm = (event.target as HTMLSelectElement).value;
    this.produto.classificacao_fiscal = selectedNcm;
  }
}
