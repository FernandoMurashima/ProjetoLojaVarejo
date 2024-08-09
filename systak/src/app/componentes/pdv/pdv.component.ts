import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LojaService, Loja } from '../../service/loja.service';
import { ClienteService, Cliente } from '../../service/cliente.service';
import { FuncionarioService, Funcionario } from '../../service/funcionario.service';
import { ProdutoService, ProdutoDetalhe } from '../../service/produto.service';
import { TabelaPrecoItemService } from '../../service/tabela-precoitem.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { CorService, Cor } from '../../service/cor.service';
import { TamanhoService, Tamanho } from '../../service/tamanho.service';
import { CodigoService } from '../../service/codigo.service';
import { EstoqueService, Estoque } from '../../service/estoque.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ClienteComponent } from '../cliente/cliente.component';
import { ReceberService } from '../../service/receber.service';
import { ReceberItensService } from '../../service/receberitens.service';
import { formatDate } from '@angular/common';
import { ConsultaPrecoDialogComponent } from '../consulta-preco-dialog/consulta-preco-dialog.component';
import { AberturaPdvComponent } from '../aberturapdv/aberturapdv.component';

export interface Produto {
  id: number;
  codigo: string;
  descricao: string;
  cor: string;
  tamanho: string;
  quantidade: number;
  preco: number;
  total: number;
  referencia: string;
}

interface VerificarDocumentoResponse {
  usado: boolean;
}

@Component({
  selector: 'app-pdv',
  templateUrl: './pdv.component.html',
  styleUrls: ['./pdv.component.css']
})
export class PdvComponent implements OnInit {
  receberId: number | null = null;
  clienteCtrl = new FormControl({ value: '', disabled: true });
  lojaCtrl = new FormControl({ value: '', disabled: true });
  vendedorCtrl = new FormControl({ value: '', disabled: true });

  totalItens: number = 0;

  clientesFiltrados: Observable<Cliente[]>;
  clienteInput: string = '';
  clientes: Cliente[] = [];
  selectedCliente: Cliente | null = null;

  selectedLoja: number | null = null;
  lojas: Loja[] = [];
  isAuthorized: boolean = false;
  selectedVendedor: number | null = null;
  vendedores: Funcionario[] = [];
  user: any;
  vendaIniciada: boolean = false;
  botaoVoltarDesativado: boolean = false;
  productCode: string = '';
  productQty: number = 1;
  produtos: Produto[] = [];
  totalCompra: number = 0;
  exibirPagamento: boolean = false;
  desconto: number = 0;
  formaPagamento: string = '';
  totalComDesconto: number = 0;
  produtoFoto: string = 'https://via.placeholder.com/150';
  documentoFiscal: string = '';
  mostrarDialogoCancelamento: boolean = false;
  senhaCancelamento: string = '';
  numeroParcelas: number = 1;
  vendaFinalizada: boolean = false;
  pdvUser: string = '';
  totalPago: number = 0;
  valorForma: number = 0;
  estadoPagamento: 'resumo' | 'pagamento' | 'finalizado' = 'resumo';
  proximaParcelaGlobal: number = 1;

  constructor(
    private lojaService: LojaService,
    private clienteService: ClienteService,
    private funcionarioService: FuncionarioService,
    private produtoService: ProdutoService,
    private tabelaPrecoItemService: TabelaPrecoItemService,
    private authService: AuthService,
    private router: Router,
    private codigoService: CodigoService,
    private corService: CorService,
    private tamanhoService: TamanhoService,
    private estoqueService: EstoqueService,
    private http: HttpClient,
    public dialog: MatDialog,
    private receberService: ReceberService,
    private receberItensService: ReceberItensService
  ) {
    this.clientesFiltrados = this.clienteCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  ngOnInit() {
    this.openAberturaDialog();  // Abre o diálogo de abertura ao inicializar
    this.loadLojas();
    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.authService.refreshUserData().subscribe(user => {
          this.user = user;
          console.log('Usuário autenticado:', this.user);
          this.checkAuthorization();
        });
      } else {
        console.log('Usuário não está autenticado');
      }
    });

    this.clienteService.load().subscribe(data => {
      this.clientes = data;
    });
  }

  openAberturaDialog(): void {
    const dialogRef = this.dialog.open(AberturaPdvComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pdvUser = result;  // Armazena o nome do usuário autorizado
        console.log('PDV aberto por:', this.pdvUser);
      } else {
        console.log('Abertura do PDV cancelada');
        this.router.navigate(['/home']);
      }
    });
  }

  loadLojas() {
    this.lojaService.load().subscribe(data => {
      this.lojas = data;
      console.log('Lojas carregadas:', this.lojas);
    });
  }

  selectLoja() {
    if (this.selectedLoja) {
      console.log('Loja selecionada:', this.selectedLoja);
    } else {
      console.log('Nenhuma loja selecionada.');
    }
  }

  loadVendedores() {
    if (this.selectedLoja !== null) {
      console.log('Tentando carregar vendedores para a loja selecionada:', this.selectedLoja);
      this.funcionarioService.load().subscribe(data => {
        console.log('Dados de funcionários recebidos:', data);
        const lojaSelecionada = Number(this.selectedLoja);
        const filteredVendedores = data.filter(funcionario => {
          const funcionarioLoja = Number(funcionario.idloja);
          console.log(`Verificando funcionário ${funcionario.nomefuncionario} com categoria ${funcionario.categoria} e idloja ${funcionarioLoja}`);
          return funcionarioLoja === lojaSelecionada && funcionario.categoria === 'vendedor';
        });
        console.log('Vendedores filtrados:', filteredVendedores);
        this.vendedores = filteredVendedores;
        console.log('Vendedores carregados para a loja selecionada:', this.vendedores);
      });
    } else {
      this.vendedores = [];
      console.log('Nenhuma loja selecionada, lista de vendedores está vazia');
    }
  }

  selectVendedor() {
    if (this.selectedVendedor) {
      console.log('Vendedor selecionado:', this.selectedVendedor);
    } else {
      console.log('Nenhum vendedor selecionado.');
    }
  }

  onLojaChange() {
    console.log('Loja selecionada:', this.selectedLoja);
    this.loadVendedores();
  }

  checkAuthorization() {
    if (this.user) {
      console.log('Tipo de usuário:', this.user.type);
      if (this.user.type !== 'Regular') {
        this.isAuthorized = true;
        console.log('Usuário autorizado para usar o PDV');
      } else {
        this.isAuthorized = false;
        alert('Usuário não autorizado');
        this.router.navigate(['/login']);
        console.log('Usuário não autorizado para usar o PDV');
      }
    } else {
      this.isAuthorized = false;
      alert('Erro ao verificar autorização do usuário');
      this.router.navigate(['/login']);
      console.log('Erro: usuário não encontrado');
    }
  }

  selectCliente() {
    if (this.selectedCliente) {
      console.log('Cliente selecionado antes de atribuir:', this.selectedCliente);
      this.clienteInput = `${this.selectedCliente.Idcliente} - ${this.selectedCliente.Nome_cliente}`;
      this.clienteCtrl.setValue(this.selectedCliente.Nome_cliente);
      console.log('Cliente selecionado após atribuir:', this.selectedCliente);
    } else {
      console.log('Nenhum cliente selecionado.');
    }
  }

  onClienteSelected(cliente: Cliente) {
    this.selectedCliente = cliente;
    this.clienteCtrl.setValue(cliente.Nome_cliente);
  }

  private _filter(value: string | Cliente): Cliente[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value.Nome_cliente.toLowerCase();
    return this.clientes.filter(cliente => cliente.Nome_cliente.toLowerCase().includes(filterValue) || cliente.Idcliente.toString().includes(filterValue));
  }

  iniciarVenda() {
    console.log('Iniciando venda...');
    this.receberId = null;  // Redefinir o ID de receber ao iniciar uma nova venda
    console.log('Novo valor de receberId:', this.receberId);  // Log para verificar o novo valor de receberId
    this.proximaParcelaGlobal = 1
    this.vendaIniciada = true;
    this.botaoVoltarDesativado = true;
    this.selectedLoja = null;
    this.selectedVendedor = null;
    this.selectedCliente = null;
    this.clienteCtrl.setValue('');
    this.codigoService.getCodigo('Nfce').subscribe(codigos => {
      console.log('Código fiscal recebido:', codigos);
      const codigoFiscal = codigos.find(codigo => codigo.variavel === 'Nfce');
      if (codigoFiscal) {
        this.documentoFiscal = codigoFiscal.valor_var;
        console.log('Documento fiscal atualizado:', this.documentoFiscal);
      } else {
        console.error('Código fiscal "Nfce" não encontrado.');
      }
    }, error => {
      console.error('Erro ao buscar o código fiscal:', error);
    });

    this.clienteCtrl.enable();
    this.lojaCtrl.enable();
    this.vendedorCtrl.enable();
  }

  novoCliente() {
    const dialogRef = this.dialog.open(ClienteComponent, {
      width: '1500px',  // Definindo a largura do diálogo para o modo de inserção
      data: { mode: 'insert' }  // Passando o modo de inserção como dado
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedCliente = result;
        this.clienteCtrl.setValue(result.Nome_cliente);
        console.log('Novo cliente cadastrado:', result);
      }
    });
  }

  showCancelDialog() {
    this.mostrarDialogoCancelamento = true;
  }

  fecharDialogoCancelamento() {
    this.mostrarDialogoCancelamento = false;
    this.senhaCancelamento = '';
  }

  cancelarVenda() {
    if (this.senhaCancelamento === '1234') {
      console.log('Cancelando venda...');
      this.resetVenda();
      this.mostrarDialogoCancelamento = false;
      this.senhaCancelamento = '';
    } else {
      alert('Senha de cancelamento incorreta.');
      console.error('Erro: Senha de cancelamento incorreta.');
    }
  }

  resetVenda() {
    this.vendaIniciada = false;
    this.botaoVoltarDesativado = false;
    this.selectedLoja = null;
    this.selectedCliente = null;
    this.selectedVendedor = null;
    this.clienteInput = '';
    this.clienteCtrl.setValue('');
    this.productCode = '';
    this.productQty = 1;
    this.produtos = [];
    this.totalCompra = 0;
    this.totalItens = 0;
    this.exibirPagamento = false;
    this.produtoFoto = 'https://via.placeholder.com/150';
    this.documentoFiscal = '';
    this.totalPago = 0;
    this.valorForma = 0;
    console.log('Venda resetada.');
  }

  voltarAoMenuAnterior() {
    if (!this.botaoVoltarDesativado) {
      console.log('Voltando ao menu anterior...');
      this.router.navigate(['/home']);
    }
  }

  adicionarProduto() {
    if (!this.selectedLoja) {
      alert('Selecione uma loja.');
      return;
    }
    if (!this.selectedVendedor) {
      alert('Selecione um vendedor.');
      return;
    }
    if (!this.selectedCliente) {
      alert('Selecione um cliente.');
      return;
    }
  
    const codigoBarra = this.productCode;
    console.log('Adicionando produto com código de barra:', codigoBarra);
  
    this.produtoService.buscarPorCodigoBarra(codigoBarra).subscribe(produtoDetalhe => {
      if (produtoDetalhe) {
        console.log('Produto encontrado no ProdutoDetalhe:', produtoDetalhe);
  
        this.produtoService.getProdutoDescricaoPorId(produtoDetalhe.Idproduto).subscribe(produtoCompleto => {
          this.tabelaPrecoItemService.getPreco(codigoBarra).subscribe(precoItem => {
            if (precoItem) {
              console.log('Preço do produto encontrado na TabelaPrecoItem:', precoItem);
  
              this.corService.get(produtoDetalhe.Idcor).subscribe(cor => {
                this.tamanhoService.get(produtoDetalhe.Idtamanho).subscribe(tamanho => {
                  const novoProduto: Produto = {
                    id: this.produtos.length + 1,
                    codigo: produtoDetalhe.CodigodeBarra,
                    descricao: produtoCompleto.Desc_reduzida,
                    cor: cor.Descricao,
                    tamanho: tamanho.Tamanho,
                    quantidade: this.productQty,
                    preco: Number(precoItem.preco), // Certificando que é decimal
                    total: this.productQty * Number(precoItem.preco),
                    referencia: produtoCompleto.referencia // Atribuindo a referência correta
                  };
  
                  this.produtos.push(novoProduto);
                  this.totalCompra += novoProduto.total;
                  this.totalItens += novoProduto.quantidade;
                  this.atualizarTotalComDesconto();
                  this.produtoFoto = produtoCompleto.produto_foto || 'https://via.placeholder.com/150';
                  console.log('Produto adicionado à lista:', novoProduto);
  
                  this.productCode = '';
                  this.productQty = 1;
                });
              });
            } else {
              console.log('Preço não encontrado na TabelaPrecoItem');
            }
          });
        });
      } else {
        console.log('Produto não encontrado no ProdutoDetalhe');
      }
    });
  }
  
  excluirProduto(index: number) {
    const produto = this.produtos[index];
    this.totalCompra -= produto.total;
    this.totalItens -= produto.quantidade;
    this.atualizarTotalComDesconto();
    this.produtos.splice(index, 1);
    console.log(`Produto removido: ${produto.descricao}`);
  }
  
  finalizarVenda() {
    console.log('Finalizando venda...');
    this.exibirPagamento = true;
    this.estadoPagamento = 'resumo';
  }

  mostrarTelaPagamento() {
    console.log('Botão Pagar clicado');
    this.estadoPagamento = 'pagamento';
  }

  atualizarTotalComDesconto() {
    console.log('Atualizando total com desconto...');
    this.totalComDesconto = this.totalCompra - (this.totalCompra * (this.desconto / 100));
    console.log('Total com desconto atualizado:', this.totalComDesconto);
  }

  verificarDocumentoFiscal(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.get<VerificarDocumentoResponse>(`${environment.apiURL}/verificar_documento/${this.documentoFiscal}/`).subscribe({
        next: response => {
          if (response.usado) {
            console.log('Documento fiscal já utilizado, incrementando...');
            this.codigoService.incrementarCodigo('Nfce').subscribe({
              next: (incrementResponse: any) => {
                this.documentoFiscal = incrementResponse.valor_var;
                console.log('Novo documento fiscal:', this.documentoFiscal);
                resolve();
              },
              error: incrementError => {
                console.error('Erro ao incrementar o código fiscal:', incrementError);
                reject(incrementError);
              }
            });
          } else {
            resolve();
          }
        },
        error: error => {
          console.error('Erro ao verificar documento fiscal:', error);
          reject(error);
        }
      });
    });
  }

  async baixarEstoque(itens: any[]): Promise<void> {
    try {
      for (const item of itens) {
        const codigoDeBarra = item.CodigodeBarra;
        const idLoja = this.selectedLoja!;
        console.log(`Buscando estoque para o código de barra ${codigoDeBarra} e loja ${idLoja}`);
        const estoque = await this.estoqueService.getEstoque(codigoDeBarra, idLoja).toPromise();

        if (estoque) {
          const novoEstoque = estoque.Estoque - item.Qtd;
          if (novoEstoque < 0) {
            throw new Error(`Estoque insuficiente para o produto ${item.CodigodeBarra}`);
          }
          estoque.Estoque = novoEstoque;
          console.log(`Atualizando estoque para código de barra ${codigoDeBarra} e loja ${idLoja}: ${novoEstoque}`);
          await this.estoqueService.updateEstoqueByCodigoAndLoja(estoque.CodigodeBarra, estoque.Idloja, estoque).toPromise();
          console.log(`Estoque atualizado para o produto ${item.CodigodeBarra}: ${novoEstoque}`);
        } else {
          throw new Error(`Produto ${item.CodigodeBarra} não encontrado no estoque da loja ${this.selectedLoja}`);
        }
      }
    } catch (error: any) {
      console.error('Erro ao baixar o estoque:', error);
      alert(`Erro ao baixar o estoque: ${error.message || error}`);
    }
  }

  continuarVenda() {
    this.vendaFinalizada = false;
    this.resetVenda();
  }

  openConsultaPreco(): void {
    const dialogRef = this.dialog.open(ConsultaPrecoDialogComponent, {
      width: '400px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Resultado do diálogo:', result);
      if (result) {
        this.pdvUser = result;
        console.log('PDV aberto por:', this.pdvUser);
      } else {
        console.log('Abertura do PDV cancelada');
        this.router.navigate(['/home']);
      }
    });
  }

  confirmarPagamento() {
    console.log('Confirmando pagamento com desconto de:', this.desconto);
    console.log('Forma de pagamento selecionada:', this.formaPagamento);
  
    const valorRestante = this.totalComDesconto - this.totalPago;
  
    if (this.valorForma > valorRestante) {
      alert(`O valor da forma de pagamento excede o valor restante de R$${valorRestante.toFixed(2)}. Ajuste o valor.`);
      return;
    }
  
    this.totalPago += this.valorForma;
  
    console.log('Total pago atualizado:', this.totalPago);
  
    this.gravarFormaPagamento().then(() => {
      if (this.totalPago >= this.totalComDesconto) {
        this.finalizarProcessoPagamento();
      } else {
        alert(`O valor pago não cobre o total da venda. Valor restante: R$${(this.totalComDesconto - this.totalPago).toFixed(2)}.`);
        this.valorForma = 0;
      }
    }).catch(error => {
      console.error('Erro ao gravar forma de pagamento:', error);
    });
  }

  async gravarFormaPagamento(): Promise<void> {
    try {
      let parcelas = 1;
      if (this.formaPagamento === 'CREDITO_PARCELADO') {
        parcelas = this.numeroParcelas;
      }
      const valorParcela = this.valorForma / parcelas;
  
      const idReceber = await this.obterOuCriarReceber();
  
      for (let i = 0; i < parcelas; i++) {
        let dataVencimento = new Date();
        switch (this.formaPagamento) {
          case 'PIX':
          case 'DINHEIRO':
            dataVencimento = new Date();
            break;
          case 'DEBITO':
            dataVencimento.setDate(dataVencimento.getDate() + 1);
            break;
          case 'CREDITO_A_VISTA':
            dataVencimento.setDate(dataVencimento.getDate() + 30);
            break;
          case 'CREDITO_PARCELADO':
            dataVencimento.setDate(dataVencimento.getDate() + 30 * (i + 1));
            break;
          default:
            throw new Error(`Forma de pagamento desconhecida: ${this.formaPagamento}`);
        }
  
        const receberItensData = {
          Idreceber: idReceber,
          Titulo: `${this.documentoFiscal}-${this.proximaParcelaGlobal++}`,
          Parcela: i + 1,
          Datavencimento: formatDate(dataVencimento, 'yyyy-MM-dd', 'en-US'),
          Databaixa: null,
          valor_parcela: valorParcela,
          juros: 0,
          desconto: 0,
          Titulo_descontado: 'N',
          Data_desconto: null,
          idconta: 1,
          data_cadastro: formatDate(new Date(), 'yyyy-MM-ddTHH:mm:ss', 'en-US')
        };
  
        console.log('Dados para receberItens:', receberItensData);
  
        await this.receberItensService.createReceberItens(receberItensData).toPromise();
      }
  
      console.log(`Forma de pagamento ${this.formaPagamento} gravada com sucesso`);
    } catch (error: any) {
      console.error('Erro ao gravar dados financeiros:', error);
      throw new Error(`Erro ao gravar dados financeiros: ${error.message || error}`);
    }
  }

  async obterOuCriarReceber(): Promise<number> {
    if (this.receberId !== null) {
        console.log('Valor atual de receberId:', this.receberId); 
        return this.receberId;
    }

    const receberData = {
        idloja: this.selectedLoja!,
        Documento: this.documentoFiscal,
        TipoRecebimento: this.formaPagamento,
        Valor: this.totalComDesconto,
        ContaContabil: '',
        Nat_Lancamento: '',
        data_cadastro: formatDate(new Date(), 'yyyy-MM-ddTHH:mm:ss', 'en-US')
    };

    const receberResponse: any = await this.receberService.createReceber(receberData).toPromise();
    this.receberId = receberResponse.Idreceber;
    console.log('Novo valor de receberId após criação:', this.receberId);
    return receberResponse.Idreceber;
}



  
/*   async obterOuCriarReceber(): Promise<number> {
    const receberData = {
      idloja: this.selectedLoja!,
      Documento: this.documentoFiscal,
      TipoRecebimento: this.formaPagamento,
      Valor: this.totalComDesconto,
      ContaContabil: '',
      Nat_Lancamento: '',
      data_cadastro: formatDate(new Date(), 'yyyy-MM-ddTHH:mm:ss', 'en-US')
    };
  
    const receberResponse: any = await this.receberService.createReceber(receberData).toPromise();
    return receberResponse.Idreceber;
  } */

  async gravarDadosFinanceiros(venda: any, itens: any[]): Promise<void> {
    try {
        const receberData = {
            idloja: venda.Idloja,
            Documento: venda.Documento,
            TipoRecebimento: venda.tipopag,
            Valor: venda.Valor,
            ContaContabil: '',
            Nat_Lancamento: '',
            data_cadastro: formatDate(new Date(), 'yyyy-MM-ddTHH:mm:ss', 'en-US')
        };

        const receberResponse: any = await this.receberService.createReceber(receberData).toPromise();
        const idReceber = receberResponse.Idreceber;

        for (let i = 1; i <= venda.numeroParcelas; i++) {
            let dataVencimento = new Date();
            switch (venda.tipopag) {
                case 'PIX':
                case 'DINHEIRO':
                    dataVencimento = new Date();
                    break;
                case 'DEBITO':
                    dataVencimento.setDate(dataVencimento.getDate() + 1);
                    break;
                case 'CREDITO_A_VISTA':
                    dataVencimento.setDate(dataVencimento.getDate() + 30);
                    break;
                case 'CREDITO_PARCELADO':
                    dataVencimento.setDate(dataVencimento.getDate() + 30 * i);
                    break;
                default:
                    throw new Error(`Forma de pagamento desconhecida: ${venda.tipopag}`);
            }

            const receberItensData = {
                Idreceber: idReceber,
                Titulo: `${venda.Documento}-${i}`,
                Parcela: i,
                Datavencimento: formatDate(dataVencimento, 'yyyy-MM-dd', 'en-US'),
                Databaixa: null,
                valor_parcela: venda.tipopag === 'CREDITO_PARCELADO' ? venda.Valor / venda.numeroParcelas : venda.Valor,
                juros: 0,
                desconto: 0,
                Titulo_descontado: 'N',
                Data_desconto: null,
                idconta: 1,
                data_cadastro: formatDate(new Date(), 'yyyy-MM-ddTHH:mm:ss', 'en-US')
            };

            await this.receberItensService.createReceberItens(receberItensData).toPromise();
        }

        console.log('Dados financeiros gravados com sucesso');
    } catch (error: any) {
        console.error('Erro ao gravar dados financeiros:', error);
        alert(`Erro ao gravar dados financeiros: ${error.message || error}`);
    }
}

finalizarProcessoPagamento() {
  if (this.selectedVendedor === null || this.selectedLoja === null) {
      console.error('Erro: Loja ou vendedor não selecionado');
      return;
  }

  this.verificarDocumentoFiscal().then(() => {
      const vendaData = {
          venda: {
              Idloja: this.selectedLoja!,
              Idcliente: this.selectedCliente?.Idcliente || 0,
              Desconto: this.desconto,
              Cancelada: 'N',
              Documento: this.documentoFiscal,
              Valor: this.totalComDesconto,
              Tipo_documento: 'NFce',
              Idfuncionario: this.selectedVendedor!,
              comissao: Number((this.totalComDesconto * 0.01).toFixed(2)),
              acrescimo: 0,
              tipopag: this.formaPagamento,
              numeroParcelas: this.formaPagamento === 'CREDITO_PARCELADO' ? this.numeroParcelas : 1
          },
          itens: this.produtos.map(item => ({
              Documento: this.documentoFiscal,
              CodigodeBarra: item.codigo,
              codigoproduto: item.referencia,
              Qtd: item.quantidade,
              valorunitario: item.preco,
              Desconto: 0,
              Total_item: item.total,
          }))
      };

      console.log('Dados da venda que serão enviados:', vendaData);

      this.http.post(`${environment.apiURL}/vendas/create_venda/`, vendaData).subscribe({
          next: (response: any) => {
              console.log('Venda gravada com sucesso', response);

              this.baixarEstoque(vendaData.itens).then(() => {
                  this.codigoService.incrementarCodigo('Nfce').subscribe({
                      next: (incrementResponse: any) => {
                          console.log('Código fiscal incrementado com sucesso:', incrementResponse);

                          this.estadoPagamento = 'finalizado';
                          this.vendaFinalizada = true;
                          this.exibirPagamento = false;
                      },
                      error: incrementError => {
                          console.error('Erro ao incrementar o código fiscal:', incrementError);
                      }
                  });
              }).catch(error => {
                  console.error('Erro ao baixar o estoque:', error);
              });
          },
          error: error => {
              console.error('Erro ao gravar venda', error);
              if (error.error) {
                  console.error('Detalhes do erro:', error.error);
              }
          }
      });
  }).catch(error => {
      console.error('Erro ao verificar documento fiscal:', error);
  });
}

}