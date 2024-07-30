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

@Component({
  selector: 'app-pdv',
  templateUrl: './pdv.component.html',
  styleUrls: ['./pdv.component.css']
})
export class PdvComponent implements OnInit {
  clienteCtrl = new FormControl({ value: '', disabled: true });
  lojaCtrl = new FormControl({ value: '', disabled: true });
  vendedorCtrl = new FormControl({ value: '', disabled: true });

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
      width: '800px',  // Definindo a largura do diálogo para o modo de inserção
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
    this.exibirPagamento = false;
    this.produtoFoto = 'https://via.placeholder.com/150';
    this.documentoFiscal = '';
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

  finalizarVenda() {
    console.log('Finalizando venda...');
    this.exibirPagamento = true;
  }

  atualizarTotalComDesconto() {
    console.log('Atualizando total com desconto...');
    this.totalComDesconto = this.totalCompra - (this.totalCompra * (this.desconto / 100));
    console.log('Total com desconto atualizado:', this.totalComDesconto);
  }

  confirmarPagamento() {
    console.log('Confirmando pagamento com desconto de:', this.desconto);
    console.log('Forma de pagamento selecionada:', this.formaPagamento);

    if (this.selectedVendedor === null || this.selectedLoja === null) {
      console.error('Erro: Loja ou vendedor não selecionado');
      return;
    }

    const vendaData = {
      venda: {
        Idloja: parseInt(this.selectedLoja.toString(), 10),
        Idcliente: this.selectedCliente?.Idcliente || 0,
        Desconto: this.desconto,
        Cancelada: 'N',
        Documento: this.documentoFiscal,
        Valor: this.totalComDesconto,
        Tipo_documento: 'NFce',
        Idfuncionario: parseInt(this.selectedVendedor.toString(), 10),
        comissao: this.totalComDesconto * 0.01,
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
      next: response => {
        console.log('Venda gravada com sucesso', response);

        this.baixarEstoque(vendaData.itens).then(() => {
          this.codigoService.incrementarCodigo('Nfce').subscribe({
            next: incrementResponse => {
              console.log('Código fiscal incrementado com sucesso:', incrementResponse);
              this.gravarDadosFinanceiros(vendaData.venda, vendaData.itens).then(() => {
                this.resetVenda();
                this.exibirPagamento = false;
              }).catch(financeError => {
                console.error('Erro ao gravar dados financeiros:', financeError);
              });
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
          case 'CREDITO_AVISTA':
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
}
