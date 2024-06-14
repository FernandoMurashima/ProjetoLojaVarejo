import { Component, OnInit } from '@angular/core';
import { FornecedorService, Fornecedor } from '../../service/fornecedor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css']
})
export class FornecedorComponent implements OnInit {
  fornecedor: Fornecedor = this.createEmptyFornecedor();
  fornecedores: Fornecedor[] = [];
  fornecedorSelecionado?: Fornecedor;
  action: string = '';

  successMessage: string = '';
  errorMessage: string = '';
  cnpjValido: boolean = true;

  constructor(private fornecedorService: FornecedorService, private router: Router) {}

  ngOnInit(): void {
    this.loadFornecedores();
  }

  createEmptyFornecedor(): Fornecedor {
    return {
      Idfornecedor: 0,
      Nome_fornecedor: '',
      Apelido: '',
      Cnpj: '',
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
      Categoria: '',
      Bloqueio: false,
      MalaDireta: false,
      ContaContabil: '',
      data_cadastro: new Date()
    };
  }

  setAction(action: string) {
    console.log('Ação definida:', action);
    this.action = action;
    if (action === 'consultar' || action === 'editar' || action === 'excluir') {
      this.loadFornecedores();
    }
  }

  resetAction() {
    this.action = '';
    this.fornecedor = this.createEmptyFornecedor();
    this.fornecedorSelecionado = undefined;
    this.successMessage = '';
    this.errorMessage = '';
    this.cnpjValido = true;
  }

  goToIndex() {
    this.router.navigate(['/home']);
  }

  loadFornecedores() {
    this.fornecedorService.load().subscribe({
      next: (data) => {
        this.fornecedores = data;
      },
      error: (error) => {
        console.error('Erro ao carregar fornecedores', error);
      }
    });
  }

  addFornecedor() {
    if (window.confirm('Confirma a inclusão do novo fornecedor?')) {
      const fornecedorParaEnviar = { ...this.fornecedor };

      console.log("Dados do fornecedor para envio:", fornecedorParaEnviar);
      this.fornecedorService.addFornecedor(fornecedorParaEnviar).subscribe({
        next: (data) => {
          this.successMessage = 'Fornecedor adicionado com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          console.error('Erro ao cadastrar Fornecedor:', error);
          this.errorMessage = 'Erro ao cadastrar Fornecedor. Por favor, tente novamente.';
        }
      });
    }
  }

  onFornecedorChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.fornecedorSelecionado = this.fornecedores.find(p => p.Idfornecedor === +selectedId) ?? undefined;

    if (this.fornecedorSelecionado) {
      this.fornecedor = { ...this.fornecedorSelecionado };
    }
  }

  updateFornecedor() {
    if (window.confirm('Confirma a alteração do fornecedor?')) {
      if (!this.fornecedorSelecionado) return;

      const fornecedorParaEnviar = { ...this.fornecedor };
      this.fornecedorService.updateFornecedor(this.fornecedorSelecionado.Idfornecedor, fornecedorParaEnviar).subscribe({
        next: (data) => {
          this.successMessage = 'Fornecedor atualizado com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao atualizar Fornecedor. Por favor, tente novamente.';
        }
      });
    }
  }

  deleteFornecedor() {
    if (window.confirm('Confirma a exclusão do fornecedor?')) {
      if (!this.fornecedorSelecionado) return;

      this.fornecedorService.deleteFornecedor(this.fornecedorSelecionado.Idfornecedor).subscribe({
        next: (data) => {
          this.successMessage = 'Fornecedor excluído com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao excluir Fornecedor. Por favor, tente novamente.';
        }
      });
    }
  }

  onCNPJChange() {
    const cnpjPattern = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
    this.cnpjValido = cnpjPattern.test(this.fornecedor.Cnpj) || this.fornecedor.Cnpj === '00.000.000/0000-00';
  }
}
