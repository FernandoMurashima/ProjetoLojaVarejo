import { Component, OnInit } from '@angular/core';
import { NatLancamentoService, NatLancamento, NatLancamentoCreate } from '../../service/nat-lancamento.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-nat-lancamento',
  templateUrl: './nat-lancamento.component.html',
  styleUrls: ['./nat-lancamento.component.css']
})
export class NatLancamentoComponent implements OnInit {
  natLancamento: NatLancamento = this.createEmptyNatLancamento();
  natLancamentos: NatLancamento[] = [];
  natLancamentoSelecionado?: NatLancamento;
  action: string = '';

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private natLancamentoService: NatLancamentoService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadNatLancamentos();
  }

  createEmptyNatLancamento(): NatLancamento {
    return {
      idnatureza: 0,
      codigo: '',
      descricao: '',
      categoria_principal: '',
      subcategoria: '',
      tipo: '',
      status: '',
      tipo_natureza: ''
    };
  }

  setAction(action: string) {
    console.log('Ação definida:', action);
    this.action = action;
    if (action === 'consultar' || action === 'editar' || action === 'excluir') {
      this.loadNatLancamentos();
    }
  }

  resetAction() {
    this.action = '';
    this.natLancamento = this.createEmptyNatLancamento();
    this.natLancamentoSelecionado = undefined;
    this.successMessage = '';
    this.errorMessage = '';
    this.cdr.detectChanges(); // Garantir que a UI seja atualizada
  }

  goToIndex() {
    this.router.navigate(['/home']);
  }

  loadNatLancamentos() {
    this.natLancamentoService.getNatLancamentos().subscribe({
      next: (data) => {
        this.natLancamentos = data;
        console.log('Naturezas de Lançamento carregadas:', this.natLancamentos);
      },
      error: (error) => {
        console.error('Erro ao carregar naturezas de lançamento', error);
      }
    });
  }

  addNatLancamento() {
    if (window.confirm('Confirma a inclusão da nova natureza de lançamento?')) {
      const { idnatureza, ...natLancamentoParaEnviar } = this.natLancamento;

      this.natLancamentoService.addNatLancamento(natLancamentoParaEnviar).subscribe({
        next: (data) => {
          this.successMessage = 'Natureza de lançamento adicionada com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          console.error('Erro ao cadastrar Natureza de Lançamento:', error);
          this.errorMessage = 'Erro ao cadastrar Natureza de Lançamento. Por favor, tente novamente.';
        }
      });
    }
  }

/*   onNatLancamentoChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    console.log('ID selecionado:', selectedId);
    this.natLancamentoSelecionado = this.natLancamentos.find(p => p.idnatureza === +selectedId) ?? undefined;
    console.log('Natureza de Lançamento selecionada:', this.natLancamentoSelecionado);

    if (this.natLancamentoSelecionado) {
      this.natLancamento = { ...this.natLancamentoSelecionado };
      this.cdr.detectChanges(); // Garantir que a UI seja atualizada
    }
  } */

    onNatLancamentoChange(event: Event) {
      const selectedId = (event.target as HTMLSelectElement).value;
      console.log('ID selecionado:', selectedId);
      this.natLancamentoSelecionado = this.natLancamentos.find(p => p.idnatureza === +selectedId) ?? undefined;
      console.log('Natureza de Lançamento selecionada:', this.natLancamentoSelecionado);
    
      if (this.natLancamentoSelecionado) {
        this.natLancamento = { ...this.natLancamentoSelecionado };
        this.cdr.detectChanges(); // Garantir que a UI seja atualizada
      }
    }
        

  updateNatLancamento() {
    if (window.confirm('Confirma a alteração da natureza de lançamento?')) {
      if (!this.natLancamentoSelecionado) return;

      this.natLancamentoService.updateNatLancamento(this.natLancamentoSelecionado.idnatureza, this.natLancamento).subscribe({
        next: (data) => {
          this.successMessage = 'Natureza de lançamento atualizada com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao atualizar Natureza de Lançamento. Por favor, tente novamente.';
        }
      });
    }
  }

  deleteNatLancamento() {
    if (window.confirm('Confirma a exclusão da natureza de lançamento?')) {
      if (!this.natLancamentoSelecionado) return;

      this.natLancamentoService.deleteNatLancamento(this.natLancamentoSelecionado.idnatureza).subscribe({
        next: (data) => {
          this.successMessage = 'Natureza de lançamento excluída com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao excluir Natureza de Lançamento. Por favor, tente novamente.';
        }
      });
    }
  }
}
