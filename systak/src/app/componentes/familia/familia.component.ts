import { Component, OnInit } from '@angular/core';
import { FamiliaService, Familia } from '../../service/familia.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-familia',
  templateUrl: './familia.component.html',
  styleUrls: ['./familia.component.css']
})
export class FamiliaComponent implements OnInit {
  familia: Familia = this.createEmptyFamilia();
  familias: Familia[] = [];
  familiaSelecionada?: Familia;
  action: string = '';

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private familiaService: FamiliaService, private router: Router) {}

  ngOnInit(): void {
    this.loadFamilias();
  }

  createEmptyFamilia(): Familia {
    return {
      Idfamilia: 0,
      Descricao: '',
      Codigo: '',
      data_cadastro: new Date()
    };
  }

  setAction(action: string) {
    this.action = action;
    if (action === 'consultar' || action === 'editar' || action === 'excluir') {
      this.loadFamilias();
    }
  }

  resetAction() {
    this.action = '';
    this.familia = this.createEmptyFamilia();
    this.familiaSelecionada = undefined;
    this.successMessage = '';
    this.errorMessage = '';
  }

  goToIndex() {
    this.router.navigate(['/home']);
  }

  loadFamilias() {
    this.familiaService.load().subscribe({
      next: (data) => {
        this.familias = data;
      },
      error: (error) => {
        console.error('Erro ao carregar famílias', error);
      }
    });
  }

  addFamilia() {
    if (window.confirm('Confirma a inclusão da nova família?')) {
      const familiaParaEnviar = {
        Descricao: this.familia.Descricao,
        Codigo: this.familia.Codigo,
        data_cadastro: this.familia.data_cadastro
      };

      this.familiaService.addFamilia(familiaParaEnviar).subscribe({
        next: (data) => {
          this.successMessage = 'Família adicionada com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          console.error('Erro ao cadastrar Família:', error);
          this.errorMessage = 'Erro ao cadastrar Família. Por favor, tente novamente.';
        }
      });
    }
  }

  onFamiliaChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.familiaSelecionada = this.familias.find(p => p.Idfamilia === +selectedId) ?? undefined;

    if (this.familiaSelecionada) {
      this.familia = { ...this.familiaSelecionada };
    }
  }

  updateFamilia() {
    if (window.confirm('Confirma a alteração da família?')) {
      if (!this.familiaSelecionada) return;

      const familiaParaEnviar = {
        ...this.familia
      };
      this.familiaService.updateFamilia(this.familiaSelecionada.Idfamilia, familiaParaEnviar).subscribe({
        next: (data) => {
          this.successMessage = 'Família atualizada com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao atualizar Família. Por favor, tente novamente.';
        }
      });
    }
  }

  deleteFamilia() {
    if (window.confirm('Confirma a exclusão da família?')) {
      if (!this.familiaSelecionada) return;

      this.familiaService.deleteFamilia(this.familiaSelecionada.Idfamilia).subscribe({
        next: (data) => {
          this.successMessage = 'Família excluída com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao excluir Família. Por favor, tente novamente.';
        }
      });
    }
  }
}
