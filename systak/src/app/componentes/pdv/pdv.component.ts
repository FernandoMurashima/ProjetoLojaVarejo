import { Component, OnInit } from '@angular/core';
import { LojaService, Loja } from '../../service/loja.service';
import { ClienteService, Cliente } from '../../service/cliente.service';
import { FuncionarioService, Funcionario } from '../../service/funcionario.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

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
  selectedCliente: number | null = null;
  vendedores: Funcionario[] = [];
  user: any;
  vendaIniciada: boolean = false;
  botaoVoltarDesativado: boolean = false; // Nova propriedade para controlar o estado do botão

  constructor(
    private lojaService: LojaService,
    private clienteService: ClienteService,
    private funcionarioService: FuncionarioService,
    private authService: AuthService,
    private router: Router
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
    const input = (event.target as HTMLInputElement).value;
    if (input) {
      this.clienteService.load().subscribe(data => {
        this.clientes = data.filter(cliente =>
          cliente.Idcliente.toString().includes(input) || 
          cliente.Nome_cliente.toLowerCase().startsWith(input.toLowerCase())
        );
        console.log('Clientes encontrados:', this.clientes);
      });
    } else {
      this.clientes = [];
      console.log('Nenhum cliente encontrado');
    }
  }

  selectCliente(cliente: Cliente) {
    this.clienteInput = `${cliente.Idcliente} - ${cliente.Nome_cliente}`;
    this.selectedCliente = cliente.Idcliente;
    this.clientes = [];
    console.log('Cliente selecionado:', cliente);
  }

  iniciarVenda() {
    this.vendaIniciada = true;
    this.botaoVoltarDesativado = true; // Desativa o botão "Voltar ao Menu"
  }

  cancelarVenda() {
    this.vendaIniciada = false;
    this.botaoVoltarDesativado = false; // Reativa o botão "Voltar ao Menu"
    this.selectedLoja = null;
    this.selectedCliente = null;
    this.selectedVendedor = null;
    this.clienteInput = '';
  }

  voltarAoMenuAnterior() {
    if (!this.botaoVoltarDesativado) {
      this.router.navigate(['/home']);
    }
  }
}
