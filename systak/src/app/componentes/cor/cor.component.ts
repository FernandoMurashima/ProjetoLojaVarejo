import { Component, OnInit } from '@angular/core';
import { CorService, Cor } from '../../service/cor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cor',
  templateUrl: './cor.component.html',
  styleUrls: ['./cor.component.css']
})
export class CorComponent implements OnInit {
  tcor: Cor = this.createEmptyCor();
  cores: Cor[] = [];
  corSelecionada?: Cor;
  action: string = '';

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private corService: CorService, private router: Router) {}

  ngOnInit(): void {
    this.loadCores();
  }

  createEmptyCor(): Cor {
    return {
      Idcor: 0,
      Descricao: '',
      Codigo: '',
      Cor: '',
      Status: '',
      data_cadastro: new Date()
    };
  }

  setAction(action: string) {
    this.action = action;
    if (action === 'consultar' || action === 'editar' || action === 'excluir') {
      this.loadCores();
    }
  }

  resetAction() {
    this.action = '';
    this.tcor = this.createEmptyCor();
    this.corSelecionada = undefined;
    this.successMessage = '';
    this.errorMessage = '';
  }

  goToIndex() {
    this.router.navigate(['/home']);
  }

  loadCores() {
    this.corService.load().subscribe({
      next: (data) => {
        this.cores = data;
      },
      error: (error) => {
        console.error('Erro ao carregar cores', error);
      }
    });
  }

  addCor() {
    if (window.confirm('Confirma a inclusão da nova cor?')) {
      const corParaEnviar = {
        Descricao: this.tcor.Descricao,
        Codigo: this.tcor.Codigo,
        Cor: this.tcor.Cor,
        Status: this.tcor.Status,
        data_cadastro: this.tcor.data_cadastro
      };

      this.corService.addCor(corParaEnviar).subscribe({
        next: (data) => {
          this.successMessage = 'Cor adicionada com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          console.error('Erro ao cadastrar Cor:', error);
          this.errorMessage = 'Erro ao cadastrar Cor. Por favor, tente novamente.';
        }
      });
    }
  }

  onCorChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.corSelecionada = this.cores.find(p => p.Idcor === +selectedId) ?? undefined;

    if (this.corSelecionada) {
      this.tcor = { ...this.corSelecionada };
    }
  }

  updateCor() {
    if (window.confirm('Confirma a alteração da cor?')) {
      if (!this.corSelecionada) return;

      const corParaEnviar = {
        ...this.tcor
      };
      this.corService.updateCor(this.corSelecionada.Idcor, corParaEnviar).subscribe({
        next: (data) => {
          this.successMessage = 'Cor atualizada com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao atualizar Cor. Por favor, tente novamente.';
        }
      });
    }
  }

  deleteCor() {
    if (window.confirm('Confirma a exclusão da cor?')) {
      if (!this.corSelecionada) return;

      this.corService.deleteCor(this.corSelecionada.Idcor).subscribe({
        next: (data) => {
          this.successMessage = 'Cor excluída com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao excluir Cor. Por favor, tente novamente.';
        }
      });
    }
  }
}

