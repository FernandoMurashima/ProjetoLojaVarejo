import { Component, OnInit } from '@angular/core';
import { FuncionarioService, Funcionario } from '../../service/funcionario.service';
import { LojaService, Loja } from '../../service/loja.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {
  funcionario: Funcionario = this.createEmptyFuncionario();
  funcionarios: Funcionario[] = [];
  lojas: Loja[] = [];
  funcionarioSelecionado?: Funcionario;
  action: string = '';

  successMessage: string = '';
  errorMessage: string = '';
  cpfValido: boolean = true;

  constructor(
    private funcionarioService: FuncionarioService,
    private lojaService: LojaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFuncionarios();
    this.loadLojas();
  }

  createEmptyFuncionario(): Funcionario {
    return {
      Idfuncionario: 0,
      nomefuncionario: '',
      apelido: '',
      cpf: '',
      inicio: null,
      fim: null,
      categoria: '',
      data_cadastro: new Date(),
      idloja: 0,
      meta: 0 // Novo campo adicionado
    };
  }
  

  setAction(action: string) {
    console.log('Ação definida:', action);
    this.action = action;
    if (action === 'consultar' || action === 'editar' || action === 'excluir') {
      this.loadFuncionarios();
    }
  }

  resetAction() {
    this.action = '';
    this.funcionario = this.createEmptyFuncionario();
    this.funcionarioSelecionado = undefined;
    this.successMessage = '';
    this.errorMessage = '';
    this.cpfValido = true;
  }

  goToIndex() {
    this.router.navigate(['/home']);
  }

  loadFuncionarios() {
    this.funcionarioService.load().subscribe({
      next: (data) => {
        this.funcionarios = data;
      },
      error: (error) => {
        console.error('Erro ao carregar funcionários', error);
      }
    });
  }

  loadLojas() {
    this.lojaService.load().subscribe({
      next: (data) => {
        this.lojas = data;
      },
      error: (error) => {
        console.error('Erro ao carregar lojas', error);
      }
    });
  }

  addFuncionario() {
    if (window.confirm('Confirma a inclusão do novo funcionário?')) {
      const funcionarioParaEnviar = {
        nomefuncionario: this.funcionario.nomefuncionario,
        apelido: this.funcionario.apelido,
        cpf: this.funcionario.cpf,
        inicio: this.formatarData(this.funcionario.inicio),
        fim: this.formatarData(this.funcionario.fim),
        categoria: this.funcionario.categoria,
        data_cadastro: this.funcionario.data_cadastro,
        idloja: this.funcionario.idloja,
        meta: this.funcionario.meta // Novo campo adicionado
      };

      // Ajuste para campos de data vazios
      if (!funcionarioParaEnviar.inicio) {
        funcionarioParaEnviar.inicio = null;
      }
      if (!funcionarioParaEnviar.fim) {
        funcionarioParaEnviar.fim = null;
      }

      console.log("Dados do funcionário para envio:", funcionarioParaEnviar);
      this.funcionarioService.addFuncionario(funcionarioParaEnviar).subscribe({
        next: (data) => {
          this.successMessage = 'Funcionário adicionado com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          console.error('Erro ao cadastrar Funcionário:', error);
          this.errorMessage = 'Erro ao cadastrar Funcionário. Por favor, tente novamente.';
        }
      });
    }
  }

  onFuncionarioChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.funcionarioSelecionado = this.funcionarios.find(p => p.Idfuncionario === +selectedId) ?? undefined;

    if (this.funcionarioSelecionado) {
      this.funcionario = { ...this.funcionarioSelecionado };
    }
  }

  updateFuncionario() {
    if (window.confirm('Confirma a alteração do funcionário?')) {
      if (!this.funcionarioSelecionado) return;

      const funcionarioParaEnviar = {
        ...this.funcionario,
        inicio: this.formatarData(this.funcionario.inicio),
        fim: this.formatarData(this.funcionario.fim)
      };
      this.funcionarioService.updateFuncionario(this.funcionarioSelecionado.Idfuncionario, funcionarioParaEnviar).subscribe({
        next: (data) => {
          this.successMessage = 'Funcionário atualizado com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao atualizar Funcionário. Por favor, tente novamente.';
        }
      });
    }
  }

  deleteFuncionario() {
    if (window.confirm('Confirma a exclusão do funcionário?')) {
      if (!this.funcionarioSelecionado) return;

      this.funcionarioService.deleteFuncionario(this.funcionarioSelecionado.Idfuncionario).subscribe({
        next: (data) => {
          this.successMessage = 'Funcionário excluído com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao excluir Funcionário. Por favor, tente novamente.';
        }
      });
    }
  }

  onCPFChange() {
    const cpfPattern = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
    this.cpfValido = cpfPattern.test(this.funcionario.cpf);
  }

  formatarData(data: Date | string | null | undefined): string | null {
    if (!data) return null;

    if (typeof data === 'string') {
      data = new Date(data);
    }

    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
    const ano = data.getFullYear();

    return `${ano}-${mes}-${dia}`;
  }
}
