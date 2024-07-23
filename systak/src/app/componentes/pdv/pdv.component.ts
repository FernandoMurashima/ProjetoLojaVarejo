import { Component, OnInit } from '@angular/core';
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
  selectedLoja: number | null = null;
  lojas: Loja[] = [];
  isAuthorized: boolean = false;
  clienteInput: string = '';
  clientes: Cliente[] = [];
  selectedVendedor: number | null = null;
  selectedCliente: Cliente | null = null;
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
    private http: HttpClient
  ) {}

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
  }

  loadLojas() {
    this.lojaService.load().subscribe(data => {
      this.lojas = data;
      console.log('Lojas carregadas:', this.lojas);
    });
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

  buscarCliente(event: KeyboardEvent) {
    const input = (event.target as HTMLInputElement).value.trim().toLowerCase();
    console.log('Valor de entrada:', input); // Log para verificar o valor de entrada
    if (input) {
      this.clienteService.load().subscribe(data => {
        console.log('Clientes carregados do serviço:', data);
        this.clientes = data.filter(cliente => {
          const idMatch = cliente.Idcliente.toString().toLowerCase().includes(input);
          const nameMatch = cliente.Nome_cliente.toLowerCase().includes(input);
          console.log(`Verificando cliente ${cliente.Nome_cliente} - ID match: ${idMatch}, Name match: ${nameMatch}`);
          return idMatch || nameMatch;
        });
        console.log('Clientes encontrados após filtro:', this.clientes);
      }, error => {
        console.error('Erro ao carregar clientes:', error);
      });
    } else {
      this.clientes = [];
      console.log('Nenhum cliente encontrado');
    }
  }

  selectCliente(cliente: Cliente) {
    console.log('Cliente selecionado antes de atribuir:', cliente);
    this.clienteInput = `${cliente.Idcliente} - ${cliente.Nome_cliente}`;
    this.selectedCliente = cliente;
    this.clientes = [];
    console.log('Cliente selecionado após atribuir:', this.selectedCliente);
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

    this.http.post(`${environment.apiURL}/vendas/create_venda/`, vendaData).subscribe(response => {
      console.log('Venda gravada com sucesso', response);

      // Incrementar o valor_var após gravar a venda
      this.codigoService.incrementarCodigo('Nfce').subscribe(incrementResponse => {
        console.log('Código fiscal incrementado com sucesso:', incrementResponse);
        this.resetVenda(); // Cancelar venda (resetar o formulário)
        this.iniciarVenda(); // Iniciar nova venda
      }, incrementError => {
        console.error('Erro ao incrementar o código fiscal:', incrementError);
      });
    }, error => {
      console.error('Erro ao gravar venda', error);
    });
  }
}
