import { Component, OnInit } from '@angular/core';
import { UnidadeService, Unidade } from '../../service/unidade.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unidade',
  templateUrl: './unidade.component.html',
  styleUrls: ['./unidade.component.css']
})
export class UnidadeComponent implements OnInit {
  unidade: Unidade = this.createEmptyUnidade();
  unidades: Unidade[] = [];
  unidadeSelecionada?: Unidade;
  action: string = '';

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private unidadeService: UnidadeService, private router: Router) {}

  ngOnInit(): void {
    this.loadUnidades();
  }

  createEmptyUnidade(): Unidade {
    return {
      Idunidade: 0,
      Descricao: '',
      Codigo: '',
      data_cadastro: new Date()
    };
  }

  setAction(action: string) {
    this.action = action;
    if (action === 'consultar' || action === 'editar' || action === 'excluir') {
      this.loadUnidades();
    }
  }

  resetAction() {
    this.action = '';
    this.unidade = this.createEmptyUnidade();
    this.unidadeSelecionada = undefined;
    this.successMessage = '';
    this.errorMessage = '';
  }

  goToIndex() {
    this.router.navigate(['/home']);
  }

  loadUnidades() {
    this.unidadeService.load().subscribe({
      next: (data) => {
        this.unidades = data;
      },
      error: (error) => {
        console.error('Erro ao carregar unidades', error);
      }
    });
  }

  addUnidade() {
    if (window.confirm('Confirma a inclusão da nova unidade?')) {
      const unidadeParaEnviar = {
        Descricao: this.unidade.Descricao,
        Codigo: this.unidade.Codigo,
        data_cadastro: this.unidade.data_cadastro
      };

      this.unidadeService.addUnidade(unidadeParaEnviar).subscribe({
        next: (data) => {
          this.successMessage = 'Unidade adicionada com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          console.error('Erro ao cadastrar Unidade:', error);
          this.errorMessage = 'Erro ao cadastrar Unidade. Por favor, tente novamente.';
        }
      });
    }
  }

  onUnidadeChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.unidadeSelecionada = this.unidades.find(p => p.Idunidade === +selectedId) ?? undefined;

    if (this.unidadeSelecionada) {
      this.unidade = { ...this.unidadeSelecionada };
    }
  }

  updateUnidade() {
    if (window.confirm('Confirma a alteração da unidade?')) {
      if (!this.unidadeSelecionada) return;

      const unidadeParaEnviar = {
        ...this.unidade
      };
      this.unidadeService.updateUnidade(this.unidadeSelecionada.Idunidade, unidadeParaEnviar).subscribe({
        next: (data) => {
          this.successMessage = 'Unidade atualizada com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao atualizar Unidade. Por favor, tente novamente.';
        }
      });
    }
  }

  deleteUnidade() {
    if (window.confirm('Confirma a exclusão da unidade?')) {
      if (!this.unidadeSelecionada) return;

      this.unidadeService.deleteUnidade(this.unidadeSelecionada.Idunidade).subscribe({
        next: (data) => {
          this.successMessage = 'Unidade excluída com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao excluir Unidade. Por favor, tente novamente.';
        }
      });
    }
  }
}
