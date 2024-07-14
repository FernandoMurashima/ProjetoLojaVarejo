import { Component, OnInit } from '@angular/core';
import { ProdutoService, Produto, ProdutoDetalhe } from '../../service/produto.service';
import { GrupoService, Grupo } from '../../service/grupo.service';
import { SubgrupoService, Subgrupo } from '../../service/subgrupo.service';
import { GrupoDetalheService, GrupoDetalhe } from '../../service/grupodetalhe.service';
import { GradeService, Grade } from '../../service/grade.service';
import { UnidadeService, Unidade } from '../../service/unidade.service';
import { ColecaoService, Colecao } from '../../service/colecao.service';
import { MaterialService, Material } from '../../service/material.service';
import { FamiliaService, Familia } from '../../service/familia.service';
import { NcmService, Ncm } from '../../service/ncm.service';
import { CorService, Cor } from '../../service/cor.service';
import { TamanhoService, Tamanho } from '../../service/tamanho.service';
import { TabelaPrecoService, TabelaPreco } from '../../service/tabela-preco.service';
import { TabelaPrecoItemService, TabelaPrecoItem } from '../../service/tabela-precoitem.service';
import { CodigoService } from '../../service/codigo.service';
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
  cores: Cor[] = [];
  tamanhos: Tamanho[] = [];
  tabelasPreco: TabelaPreco[] = [];
  detalhes: ProdutoDetalhe[] = [];
  produtoSelecionado?: Produto;
  action: string = '';
  selectedCor?: number;
  combinacoes: { cor: Cor, tamanho: Tamanho, codigoDeBarras: string }[] = [];
  coresAdicionadas: Set<number> = new Set();
  preco: number = 0;
  precos: Array<{ codigoDeBarras: string, valor: number }> = [];

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
    private corService: CorService,
    private tamanhoService: TamanhoService,
    private tabelaPrecoService: TabelaPrecoService,
    private tabelaPrecoItemService: TabelaPrecoItemService,
    private codigoService: CodigoService,
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
    this.loadCores();
    this.loadTamanhos();
    this.loadTabelasPreco();
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
      referencia: '',
      tabela_preco: '',
      preco: 0
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
    this.detalhes = [];
    this.combinacoes = [];
    this.selectedCor = undefined;
    this.coresAdicionadas.clear();
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
      produto['grupoDescricao'] = this.grupos.find(grupo => grupo.Idgrupo.toString() === produto.grupo)?.Descricao || '';
      produto['subgrupoDescricao'] = this.subgrupos.find(subgrupo => subgrupo.Idsubgrupo.toString() === produto.subgrupo)?.Descricao || '';
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

  loadCores() {
    this.corService.load().subscribe({
      next: (data: Cor[]) => {
        this.cores = data;
      },
      error: (error: any) => {
        console.error('Erro ao carregar cores', error);
      }
    });
  }

  loadTamanhos() {
    this.tamanhoService.load().subscribe({
      next: (data: Tamanho[]) => {
        this.tamanhos = data;
      },
      error: (error: any) => {
        console.error('Erro ao carregar tamanhos', error);
      }
    });
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
        this.generateReference();
      },
      error: (error: any) => {
        console.error('Erro ao carregar subgrupos do grupo', error);
      }
    });
  }

  onColecaoChange(event: Event) {
    const selectedId = +(event.target as HTMLSelectElement).value;
    console.log('Coleção selecionada ID:', selectedId);
    this.generateReference();
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

  onTabelaPrecoChange(event: Event) {
    const selectedId = +(event.target as HTMLSelectElement).value;
    this.produto['tabela_preco'] = selectedId;
    console.log('Tabela de Preço selecionada ID:', this.produto['tabela_preco']);
  }

  async generateReference() {
    if (!this.produto.colecao || !this.produto.grupo) {
      console.error('Coleção ou grupo não selecionado');
      return;
    }

    const colecaoId = Number(this.produto.colecao);
    const grupoId = Number(this.produto.grupo);

    try {
      const colecao = await this.colecaoService.get(colecaoId).toPromise();
      const grupo = await this.grupoService.get(grupoId).toPromise();

      if (!colecao || !grupo) {
        console.error('Coleção ou grupo não encontrado');
        return;
      }

      const codigoColecao = colecao.Codigo;
      const estacaoColecao = colecao.Estacao;
      let contador = colecao.Contador + 1;
      const contadorStr = String(contador).padStart(3, '0');
      const referencia = `${codigoColecao}-${estacaoColecao}-${grupo.Codigo}${contadorStr}`;

      const isUnique = await this.produtoService.checkUniqueReference(referencia).toPromise();
      if (isUnique) {
        this.produto.referencia = referencia;
        console.log('Referência Gerada:', this.produto.referencia);
      } else {
        throw new Error('Referência não é única');
      }
    } catch (error) {
      console.error('Erro ao gerar referência:', error);
    }
  }

  async addProduto() {
    try {
      await this.generateReference();
      if (window.confirm('Confirma a inclusão do novo produto?')) {
        const produtoParaEnviar = { ...this.produto };
        delete produtoParaEnviar.Idproduto;
  
        console.log("Dados do produto para envio:", produtoParaEnviar);
        this.produtoService.addProduto(produtoParaEnviar).subscribe({
          next: async (data: Produto) => {
            this.successMessage = '';
            await this.updateContador();
            this.produtoSelecionado = data;
            this.produto.Idproduto = data.Idproduto;
            this.action = 'adicionarCor';
          },
          error: (error: any) => {
            console.error('Erro ao cadastrar produto:', error);
            this.errorMessage = 'Erro ao cadastrar produto. Por favor, tente novamente.';
          }
        });
      }
    } catch (error) {
      console.error('Erro ao preparar a inclusão do produto:', error);
    }
  }

  async updateContador() {
    try {
      if (this.produto.colecao) {
        const colecaoId = Number(this.produto.colecao);
        await this.produtoService.updateContador(colecaoId).toPromise();
        console.log('Contador da coleção atualizado.');
      }
    } catch (error) {
      console.error('Erro ao atualizar o contador da coleção:', error);
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

  onCorChange(event: Event) {
    const selectedId = +(event.target as HTMLSelectElement).value;
    this.selectedCor = selectedId;
    console.log('Cor selecionada ID:', this.selectedCor);
  }

  listarCombinacoes() {
    if (!this.selectedCor || !this.produto.grade) {
      console.error('Cor ou grade não selecionada');
      return;
    }

    if (this.coresAdicionadas.has(this.selectedCor)) {
      console.error('Esta cor já foi adicionada.');
      this.errorMessage = 'Esta cor já foi adicionada. Por favor, selecione outra cor.';
      return;
    }

    const cor = this.cores.find(cor => cor.Idcor === this.selectedCor);
    const tamanhos = this.tamanhos?.filter(tamanho => tamanho.idgrade === +(this.produto.grade ?? 0));

    if (!cor || tamanhos?.length === 0) {
      console.error('Cor selecionada não encontrada ou sem tamanhos associados');
      return;
    }

    Promise.all(tamanhos.map(async tamanho => {
      const codigoDeBarras = await this.gerarCodigoDeBarrasParaProduto();
      return {
        cor,
        tamanho,
        codigoDeBarras
      };
    })).then(combinacoes => {
      this.combinacoes = combinacoes;
      console.log('Combinações geradas:', this.combinacoes);
      this.salvarCombinacoes(); // Chamar método para salvar as combinações
    }).catch(error => {
      console.error('Erro ao gerar combinações:', error);
    });
  }

  async salvarCombinacoes() {
    console.log('Iniciando salvarCombinacoes');
    try {
      const produtoId = this.produtoSelecionado?.Idproduto;
      const referenciaProduto = this.produto.referencia;
      console.log('produtoId:', produtoId);
      console.log('referenciaProduto:', referenciaProduto);
      if (!produtoId || !referenciaProduto) {
        throw new Error('Produto não selecionado ou referência do produto não encontrada.');
      }
  
      for (const combinacao of this.combinacoes) {
        console.log('Salvando combinação:', combinacao);
        const produtoDetalhe: ProdutoDetalhe = {
          CodigodeBarra: combinacao.codigoDeBarras,
          Codigoproduto: referenciaProduto,
          Idproduto: produtoId,
          Idtamanho: combinacao.tamanho.Idtamanho,
          Idcor: combinacao.cor.Idcor,
          Item: 0
        };
  
        await this.produtoService.addProdutoDetalhe(produtoDetalhe).toPromise();

        const tabelaPrecoItem: TabelaPrecoItem = {
          codigoproduto: referenciaProduto,
          codigodebarra: combinacao.codigoDeBarras,
          preco: this.produto['preco'],
          idtabela: this.produto['tabela_preco']
        };

        await this.tabelaPrecoItemService.addTabelaPrecoItem(tabelaPrecoItem).toPromise();
      }
      console.log('Combinações e preços salvos com sucesso.');
      this.successMessage = 'Combinações e preços salvos com sucesso!';
      this.coresAdicionadas.add(this.selectedCor!);
    } catch (error) {
      console.error('Erro ao salvar combinações e preços:', error);
      this.errorMessage = 'Erro ao salvar combinações e preços. Por favor, tente novamente.';
    }
  }

  async gerarCodigoDeBarrasParaProduto(): Promise<string> {
    const prefixoPais = '789';
    const prefixoEmpresa = '1234';

    try {
      const empresaCodigoResponse = await this.codigoService.incrementEmpresaCodigo().toPromise();
      const numeroProduto = String(empresaCodigoResponse.novo_valor).padStart(4, '0');
      const codigoParcial = `${prefixoPais}${prefixoEmpresa}${numeroProduto}`;

      const digitoVerificador = this.calcularDigitoVerificador(codigoParcial);
      return `${codigoParcial}${digitoVerificador}`;
    } catch (error) {
      console.error('Erro ao gerar código de barras:', error);
      return '';
    }
  }

  calcularDigitoVerificador(codigo: string): string {
    let soma = 0;
    for (let i = 0; i < codigo.length; i++) {
      const num = parseInt(codigo[i], 10);
      soma += (i % 2 === 0) ? num * 1 : num * 3;
    }
    const resto = soma % 10;
    return resto === 0 ? '0' : (10 - resto).toString();
  }

  adicionarOutraCor() {
    this.selectedCor = undefined;
    this.combinacoes = [];
    this.setAction('adicionarCor');
  }

  finalizar() {
    this.resetAction();
    alert('Processo finalizado com sucesso!');
  }

  vincularPrecos() {
    this.combinacoes.forEach(combinacao => {
      this.precos.push({ codigoDeBarras: combinacao.codigoDeBarras, valor: this.produto['preco'] });
    });
  }
}
