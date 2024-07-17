import { Component, OnInit } from '@angular/core';
import { LojaService, Loja } from '../../service/loja.service';
import { ClienteService, Cliente } from '../../service/cliente.service';
import { FuncionarioService, Funcionario } from '../../service/funcionario.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';  // Certifique-se de importar o Router

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
  vendedores: Funcionario[] = [];
  user: any;

  constructor(
    private lojaService: LojaService,
    private clienteService: ClienteService,
    private funcionarioService: FuncionarioService,
    private authService: AuthService,
    private router: Router  // Certifique-se de injetar o Router
  ) {}

  ngOnInit() {
    this.loadLojas();
    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.authService.refreshUserData().subscribe(user => {
          this.user = user;
          console.log('Usuário autenticado:', this.user);  // Adiciona log para verificar o usuário autenticado
          this.checkAuthorization();  // Verificar a autorização aqui após carregar o usuário
        });
      } else {
        console.log('Usuário não está autenticado');
      }
    });
  }

  loadLojas() {
    this.lojaService.load().subscribe(data => {
      this.lojas = data;
      console.log('Lojas carregadas:', this.lojas);  // Adiciona log para verificar as lojas carregadas
    });
  }

  loadVendedores() {
    if (this.selectedLoja !== null) {
      console.log('Tentando carregar vendedores para a loja selecionada:', this.selectedLoja);  // Adiciona log para verificar a loja selecionada
      this.funcionarioService.load().subscribe(data => {
        console.log('Dados de funcionários recebidos:', data);  // Adiciona log para verificar os dados recebidos
        const lojaSelecionada = Number(this.selectedLoja);  // Garantindo que selectedLoja seja um número
        const filteredVendedores = data.filter(funcionario => {
          const funcionarioLoja = Number(funcionario.idloja);  // Garantindo que funcionario.idloja seja um número
          console.log(`Verificando funcionário ${funcionario.nomefuncionario} com categoria ${funcionario.categoria} e idloja ${funcionarioLoja}`);
          return funcionarioLoja === lojaSelecionada && funcionario.categoria === 'vendedor';
        });
        console.log('Vendedores filtrados:', filteredVendedores);  // Adiciona log para verificar os vendedores filtrados
        this.vendedores = filteredVendedores;
        console.log('Vendedores carregados para a loja selecionada:', this.vendedores);  // Adiciona log para verificar os vendedores carregados
      });
    } else {
      this.vendedores = [];
      console.log('Nenhuma loja selecionada, lista de vendedores está vazia');
    }
  }

  onLojaChange() {
    console.log('Loja selecionada:', this.selectedLoja);  // Adiciona log para verificar a loja selecionada
    this.loadVendedores();  // Carregar os vendedores quando a loja é selecionada
  }

  checkAuthorization() {
    if (this.user) {
      console.log('Tipo de usuário:', this.user.type);  // Adiciona log para verificar o tipo de usuário
      if (this.user.type !== 'Regular') {
        this.isAuthorized = true;
        console.log('Usuário autorizado para usar o PDV');
      } else {
        this.isAuthorized = false;
        alert('Usuário não autorizado');
        this.router.navigate(['/login']);  // Redireciona para a página de login
        console.log('Usuário não autorizado para usar o PDV');
      }
    } else {
      this.isAuthorized = false;
      alert('Erro ao verificar autorização do usuário');
      this.router.navigate(['/login']);  // Redireciona para a página de login
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
        console.log('Clientes encontrados:', this.clientes);  // Adiciona log para verificar os clientes encontrados
      });
    } else {
      this.clientes = [];
      console.log('Nenhum cliente encontrado');  // Adiciona log para verificar quando nenhum cliente é encontrado
    }
  }

  selectCliente(cliente: Cliente) {
    this.clienteInput = `${cliente.Idcliente} - ${cliente.Nome_cliente}`;
    this.clientes = [];
    console.log('Cliente selecionado:', cliente);  // Adiciona log para verificar o cliente selecionado
  }
}
