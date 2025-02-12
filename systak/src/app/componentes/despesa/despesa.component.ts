import { Component, OnInit } from '@angular/core';
import { DespesaService, Despesa } from '../../service/despesa.service';
import { LojaService, Loja } from '../../service/loja.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.component.html',
  styleUrls: ['./despesa.component.css']
})
export class DespesaComponent implements OnInit {
  despesa: Omit<Despesa, 'iddespesa'> = this.createEmptyDespesa();
  despesas: Despesa[] = [];
  despesaSelecionada?: Despesa;
  lojas: Loja[] = [];
  action: string = '';

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private despesaService: DespesaService,
    private lojaService: LojaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDespesas();
    this.loadLojas();
  }

  createEmptyDespesa(): Omit<Despesa, 'iddespesa'> {
    return {
      idloja: 0,
      data: '',
      descricao: '',
      autorizado: '',
      valor: 0,
      recibo: ''
    };
  }

  setAction(action: string) {
    this.action = action;
    if (action === 'consultar' || action === 'editar' || action === 'excluir') {
      this.loadDespesas();
    }
  }

  resetAction() {
    this.action = '';
    this.despesa = this.createEmptyDespesa();
    this.despesaSelecionada = undefined;
    this.successMessage = '';
    this.errorMessage = '';
  }

  goToIndex() {
    this.router.navigate(['/home']);
  }

  loadDespesas() {
    this.despesaService.load().subscribe({
      next: (data) => {
        this.despesas = data;
      },
      error: (error) => {
        console.error('Erro ao carregar despesas', error);
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

  addDespesa() {
    if (window.confirm('Confirma a inclusão da nova despesa?')) {
      this.despesaService.addDespesa(this.despesa).subscribe({
        next: () => {
          this.successMessage = 'Despesa adicionada com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          console.error('Erro ao cadastrar Despesa:', error);
          this.errorMessage = 'Erro ao cadastrar Despesa. Por favor, tente novamente.';
        }
      });
    }
  }

  onDespesaChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.despesaSelecionada = this.despesas.find(p => p.iddespesa === +selectedId) ?? undefined;

    if (this.despesaSelecionada) {
      this.despesa = { ...this.despesaSelecionada };
    }
  }

  updateDespesa() {
    if (window.confirm('Confirma a alteração da despesa?')) {
      if (!this.despesaSelecionada) return;

      this.despesaService.updateDespesa(this.despesaSelecionada.iddespesa, this.despesa).subscribe({
        next: () => {
          this.successMessage = 'Despesa atualizada com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao atualizar Despesa. Por favor, tente novamente.';
        }
      });
    }
  }

  deleteDespesa() {
    if (window.confirm('Confirma a exclusão da despesa?')) {
      if (!this.despesaSelecionada) return;

      this.despesaService.deleteDespesa(this.despesaSelecionada.iddespesa).subscribe({
        next: () => {
          this.successMessage = 'Despesa excluída com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao excluir Despesa. Por favor, tente novamente.';
        }
      });
    }
  }
}
