import { Component, OnInit } from '@angular/core';
import { LojaService, Loja } from '../../service/loja.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loja',
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.css']
})
export class LojaComponent implements OnInit {
  loja: Loja = this.createEmptyLoja();
  lojas: Loja[] = [];
  lojaSelecionada?: Loja;
  action: string = '';

  successMessage: string = '';
  errorMessage: string = '';
  cnpjValido: boolean = true;

  constructor(private lojaService: LojaService, private router: Router) {}

  ngOnInit(): void {
    this.loadLojas();
  }

  createEmptyLoja(): Loja {
    return {
      Idloja: 0,
      nome_loja: '',
      Apelido_loja: '',
      cnpj: '',
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
      EstoqueNegativo: '',
      Rede: '',
      DataAbertura: null,
      ContaContabil: '',
      DataEnceramento: null,
      Matriz: '',
      data_cadastro: new Date()
    };
  }

  setAction(action: string) {
    console.log('Ação definida:', action);
    this.action = action;
    if (action === 'consultar' || action === 'editar' || action === 'excluir') {
      this.loadLojas();
    }
  }

  resetAction() {
    this.action = '';
    this.loja = this.createEmptyLoja();
    this.lojaSelecionada = undefined;
    this.successMessage = '';
    this.errorMessage = '';
    this.cnpjValido = true;
  }

  goToIndex() {
    this.router.navigate(['/home']);
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

  addLoja() {
    if (window.confirm('Confirma a inclusão da nova loja?')) {
      const lojaParaEnviar = {
        nome_loja: this.loja.nome_loja,
        Apelido_loja: this.loja.Apelido_loja,
        cnpj: this.loja.cnpj,
        Logradouro: this.loja.Logradouro,
        Endereco: this.loja.Endereco,
        numero: this.loja.numero,
        Complemento: this.loja.Complemento,
        Cep: this.loja.Cep,
        Bairro: this.loja.Bairro,
        Cidade: this.loja.Cidade,
        Telefone1: this.loja.Telefone1,
        Telefone2: this.loja.Telefone2,
        email: this.loja.email,
        EstoqueNegativo: this.loja.EstoqueNegativo,
        Rede: this.loja.Rede,
        DataAbertura: this.formatarData(this.loja.DataAbertura),
        ContaContabil: this.loja.ContaContabil,
        DataEnceramento: this.formatarData(this.loja.DataEnceramento),
        Matriz: this.loja.Matriz,
        data_cadastro: this.loja.data_cadastro
      };

      // Ajuste para campos de data vazios
      if (!lojaParaEnviar.DataAbertura) {
        lojaParaEnviar.DataAbertura = null;
      }
      if (!lojaParaEnviar.DataEnceramento) {
        lojaParaEnviar.DataEnceramento = null;
      }

      console.log("Dados da loja para envio:", lojaParaEnviar); // Adicione este log para verificar o payload
      this.lojaService.addLoja(lojaParaEnviar).subscribe({
        next: (data) => {
          this.successMessage = 'Loja adicionada com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          console.error('Erro ao cadastrar Loja:', error); // Registre o erro completo
          this.errorMessage = 'Erro ao cadastrar Loja. Por favor, tente novamente.';
        }
      });
    }
  }

  onLojaChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.lojaSelecionada = this.lojas.find(p => p.Idloja === +selectedId) ?? undefined;

    if (this.lojaSelecionada) {
      this.loja = { ...this.lojaSelecionada };
    }
  }

  updateLoja() {
    if (window.confirm('Confirma a alteração da loja?')) {
      if (!this.lojaSelecionada) return;

      const lojaParaEnviar = {
        ...this.loja,
        DataAbertura: this.formatarData(this.loja.DataAbertura),
        DataEnceramento: this.formatarData(this.loja.DataEnceramento)
      };
      this.lojaService.updateLoja(this.lojaSelecionada.Idloja, lojaParaEnviar).subscribe({
        next: (data) => {
          this.successMessage = 'Loja atualizada com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao atualizar Loja. Por favor, tente novamente.';
        }
      });
    }
  }

  deleteLoja() {
    if (window.confirm('Confirma a exclusão da loja?')) {
      if (!this.lojaSelecionada) return;

      this.lojaService.deleteLoja(this.lojaSelecionada.Idloja).subscribe({
        next: (data) => {
          this.successMessage = 'Loja excluída com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao excluir Loja. Por favor, tente novamente.';
        }
      });
    }
  }

  onCNPJChange() {
    const cnpjPattern = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
    this.cnpjValido = cnpjPattern.test(this.loja.cnpj) || this.loja.cnpj === '00.000.000/0000-00';
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
