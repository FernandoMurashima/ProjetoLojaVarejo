import { Component, OnInit } from '@angular/core';
import { ClienteService, Cliente } from '../../service/cliente.service';
import { Router } from '@angular/router';
import { NatLancamentoService, NatLancamento } from '../../service/nat-lancamento.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  cliente: Cliente = this.createEmptyCliente();
  clientes: Cliente[] = [];
  clienteSelecionado?: Cliente;
  action: string = '';

  successMessage: string = '';
  errorMessage: string = '';
  natLancamentos: NatLancamento[] = [];

  constructor(
    private clienteService: ClienteService,
    private natLancamentoService: NatLancamentoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClientes();
    this.loadNatLancamentos();
  }

  createEmptyCliente(): Cliente {
    return {
      Idcliente: 0,
      Nome_cliente: '',
      Apelido: '',
      cpf: '',
      Logradouro: '',
      Endereco: '',
      numero: '',
      Complemento: '',
      Cep: '',
      Bairro: '',
      Cidade: '',
      Telefone1: '',
      Telefone2: '',
      email: '',
      Bloqueio: false,
      MalaDireta: false,
      Aniversario: null,
      Categoria: '',
      ContaContabil: '',
      data_cadastro: new Date()
    };
  }

  setAction(action: string) {
    console.log('Ação definida:', action);
    this.action = action;
    if (action === 'consultar' || action === 'editar' || action === 'excluir') {
      this.loadClientes();
    }
  }

  resetAction() {
    this.action = '';
    this.cliente = this.createEmptyCliente();
    this.clienteSelecionado = undefined;
    this.successMessage = '';
    this.errorMessage = '';
  }

  goToIndex() {
    this.router.navigate(['/home']);
  }

  loadClientes() {
    this.clienteService.load().subscribe({
      next: (data: Cliente[]) => {
        this.clientes = data;
      },
      error: (error: any) => {
        console.error('Erro ao carregar clientes', error);
      }
    });
  }

/*   loadNatLancamentos() {
    this.natLancamentoService.getNatLancamentos().subscribe({
      next: (data: NatLancamento[]) => {
        console.log(data); // Verifique os dados recebidos
        this.natLancamentos = data;
      },
      error: (error: any) => {
        console.error('Erro ao carregar naturezas de lançamento', error);
      }
    });
  } */

    loadNatLancamentos() {
      this.natLancamentoService.getNatLancamentos().subscribe({
        next: (data: NatLancamento[]) => {
          this.natLancamentos = data.filter(nat => nat.codigo.startsWith('1.')); // Filtra os registros
        },
        error: (error: any) => {
          console.error('Erro ao carregar naturezas de lançamento', error);
        }
      });
    }

  addCliente() {
    if (window.confirm('Confirma a inclusão do novo cliente?')) {
      const clienteParaEnviar = { ...this.cliente };
      console.log("Dados do cliente para envio:", clienteParaEnviar);
      this.clienteService.addCliente(clienteParaEnviar).subscribe({
        next: (data: Cliente) => {
          this.successMessage = 'Cliente adicionado com sucesso!';
          this.resetAction();
        },
        error: (error: any) => {
          console.error('Erro ao cadastrar cliente:', error);
          this.errorMessage = 'Erro ao cadastrar cliente. Por favor, tente novamente.';
        }
      });
    }
  }

  updateCliente() {
    if (window.confirm('Confirma a alteração do cliente?')) {
      if (!this.clienteSelecionado) return;

      const clienteParaEnviar = { ...this.cliente };
      this.clienteService.updateCliente(this.clienteSelecionado.Idcliente, clienteParaEnviar).subscribe({
        next: (data: Cliente) => {
          this.successMessage = 'Cliente atualizado com sucesso!';
          this.resetAction();
        },
        error: (error: any) => {
          this.errorMessage = 'Erro ao atualizar cliente. Por favor, tente novamente.';
        }
      });
    }
  }

  deleteCliente() {
    if (window.confirm('Confirma a exclusão do cliente?')) {
      if (!this.clienteSelecionado) return;

      this.clienteService.deleteCliente(this.clienteSelecionado.Idcliente).subscribe({
        next: (data: any) => {
          this.successMessage = 'Cliente excluído com sucesso!';
          this.resetAction();
        },
        error: (error: any) => {
          this.errorMessage = 'Erro ao excluir cliente. Por favor, tente novamente.';
        }
      });
    }
  }

  onClienteChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.clienteSelecionado = this.clientes.find(p => p.Idcliente === +selectedId) ?? undefined;

    if (this.clienteSelecionado) {
      this.cliente = { ...this.clienteSelecionado };
    }
  }

  onCheckboxChange(event: Event, field: 'Bloqueio' | 'MalaDireta') {
    const input = event.target as HTMLInputElement;
    if (field === 'Bloqueio') {
      this.cliente.Bloqueio = input.checked;
    } else if (field === 'MalaDireta') {
      this.cliente.MalaDireta = input.checked;
    }
  }
}
