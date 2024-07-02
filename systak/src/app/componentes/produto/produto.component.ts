import { Component, OnInit } from '@angular/core';
import { ProdutoService, Produto } from '../../service/produto.service';
import { GrupoService, Grupo } from '../../service/grupo.service';
import { SubgrupoService, Subgrupo } from '../../service/subgrupo.service';
import { GrupoDetalheService, GrupoDetalhe } from '../../service/grupodetalhe.service';
import { GradeService, Grade } from '../../service/grade.service';
import { UnidadeService, Unidade } from '../../service/unidade.service';
import { ColecaoService, Colecao } from '../../service/colecao.service';
import { MaterialService, Material } from '../../service/material.service';
import { FamiliaService, Familia } from '../../service/familia.service';
import { NcmService, Ncm } from '../../service/ncm.service';
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
  subgruposFiltrados: Subgrupo[] = [];
  grades: Grade[] = [];
  unidades: Unidade[] = [];
  colecoes: Colecao[] = [];
  materiais: Material[] = [];
  familias: Familia[] = [];
  ncms: Ncm[] = [];
  produtoSelecionado?: Produto;
  action: string = '';

  successMessage: string = '';
  errorMessage: string = '';

  private readonly imageBasePath = 'assets/Imagens/';

  constructor(
    private produtoService: ProdutoService,
    private subgrupoService: SubgrupoService,
    private grupoService: GrupoService,
    private gradeService: GradeService,
    private unidadeService: UnidadeService,
    private colecaoService: ColecaoService,
    private materialService: MaterialService,
    private familiaService: FamiliaService,
    private ncmService: NcmService,
    private grupoDetalheService: GrupoDetalheService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProdutos();
    this.loadGrades();
    this.loadUnidades();
    this.loadColecoes();
    this.loadMateriais();
    this.loadFamilias();
    this.loadNcms();
    this.loadGrupos();
    this.loadSubgrupos();
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
      data_cadastro: new Date(),
      Referencia: ''
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
    this.subgruposFiltrados = [];
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

  loadGrupos() {
    this.grupoService.load().subscribe({
      next: (data: Grupo[]) => {
        console.log('Grupos carregados:', data);
        this.grupos = data;
      },
      error: (error: any) => {
        console.error('Erro ao carregar grupos', error);
      }
    });
  }

  loadSubgrupos() {
    this.subgrupoService.load().subscribe({
      next: (data: Subgrupo[]) => {
        console.log('Subgrupos carregados:', data);
        this.subgrupos = data;
      },
      error: (error: any) => {
        console.error('Erro ao carregar subgrupos', error);
      }
    });
  }

  onProdutoChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.produtoSelecionado = this.produtos.find(p => p.Idproduto === +selectedId) ?? undefined;

    if (this.produtoSelecionado) {
      this.produto = { ...this.produtoSelecionado };
    }
  }

  onGrupoChange(event: Event) {
    const selectedId = +(event.target as HTMLSelectElement).value;
    console.log('Grupo selecionado ID:', selectedId);
    this.grupoDetalheService.loadByGrupo(selectedId).subscribe({
      next: (data: GrupoDetalhe[]) => {
        console.log('GrupoDetalhe carregado:', data);
        const subgrupoIds = data.filter(detail => detail.idgrupo === selectedId).map(detail => detail.idsubgrupo);
        this.subgruposFiltrados = this.subgrupos.filter(subgrupo => {
          const isIncluded = subgrupoIds.includes(subgrupo.Idsubgrupo);
          console.log(`Subgrupo ${subgrupo.Idsubgrupo} incluído:`, isIncluded);
          return isIncluded;
        });
        console.log('Subgrupos filtrados:', this.subgruposFiltrados);
      },
      error: (error: any) => {
        console.error('Erro ao carregar subgrupos do grupo', error);
      }
    });
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

  truncate(text: string, limit: number): string {
    if (text.length > limit) {
      return text.substring(0, limit) + '...';
    } else {
      return text;
    }
  }
}
