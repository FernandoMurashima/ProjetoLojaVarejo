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
    private http: HttpClient
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
          this.clienteCtrl.enable(); // Habilitar após a autorização
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
      this.clienteCtrl.setValue(this.selectedCliente.Nome_cliente); // Atualiza o valor do controle do formulário
      console.log('Cliente selecionado após atribuir:', this.selectedCliente);
    } else {
      console.log('Nenhum cliente selecionado.');
    }
  }
  

  onClienteSelected(cliente: Cliente) {
    this.selectedCliente = cliente;
    this.clienteCtrl.setValue(cliente.Nome_cliente); // Atualiza o valor do controle do formulário para exibir o nome do cliente
  }
  
  

  private _filter(value: string | Cliente): Cliente[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value.Nome_cliente.toLowerCase();
    return this.clientes.filter(cliente => cliente.Nome_cliente.toLowerCase().includes(filterValue) || cliente.Idcliente.toString().includes(filterValue));
  }
  

  iniciarVenda() {
    console.log('Iniciando venda...');
    this.vendaIniciada = true;
    this.botaoVoltarDesativado = true;
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
  
    // Habilitar os controles após iniciar a venda
    this.clienteCtrl.enable();
    this.lojaCtrl.enable();
    this.vendedorCtrl.enable();
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
      },
      itens: this.produtos.map(item => ({
        Documento: this.documentoFiscal,
        CodigodeBarra: item.codigo,
        codigoproduto: item.referencia, // Usando a referência correta
        Qtd: item.quantidade,
        valorunitario: item.preco, // Garantindo que é decimal
        Desconto: 0,
        Total_item: item.total,
      }))
    };
  
    console.log('Dados da venda que serão enviados:', vendaData);
  
    this.http.post(`${environment.apiURL}/vendas/create_venda/`, vendaData).subscribe({
      next: response => {
        console.log('Venda gravada com sucesso', response);
  
        // Chamar a rotina baixarEstoque após gravar a venda
        this.baixarEstoque(vendaData.itens).then(() => {
          // Incrementar o valor_var após baixar o estoque
          this.codigoService.incrementarCodigo('Nfce').subscribe({
            next: incrementResponse => {
              console.log('Código fiscal incrementado com sucesso:', incrementResponse);
              this.resetVenda(); // Cancelar venda (resetar o formulário)
              this.iniciarVenda(); // Iniciar nova venda
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
}
