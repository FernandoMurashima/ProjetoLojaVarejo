import { Component, OnInit } from '@angular/core';
import { NcmService, Ncm } from '../../service/ncm.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ncm',
  templateUrl: './ncm.component.html',
  styleUrls: ['./ncm.component.css']
})
export class NcmComponent implements OnInit {
  tncm: Ncm = this.createEmptyNcm();
  ncms: Ncm[] = [];
  ncmSelecionado?: Ncm;
  action: string = '';

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private ncmService: NcmService, private router: Router) {}

  ngOnInit(): void {
    this.loadNcms();
  }

  createEmptyNcm(): Ncm {
    return {
      id: 0,
      ncm: '',
      campo1: '',
      descricao: '',
      aliquota: ''
    };
  }

  setAction(action: string) {
    this.action = action;
    if (action === 'consultar' || action === 'editar' || action === 'excluir') {
      this.loadNcms();
    }
  }

  resetAction() {
    this.action = '';
    this.tncm = this.createEmptyNcm();
    this.ncmSelecionado = undefined;
    this.successMessage = '';
    this.errorMessage = '';
  }

  goToIndex() {
    this.router.navigate(['/home']);
  }

  loadNcms() {
    this.ncmService.load().subscribe({
      next: (data) => {
        this.ncms = data;
      },
      error: (error) => {
        console.error('Erro ao carregar NCMs', error);
      }
    });
  }

  addNcm() {
    if (window.confirm('Confirma a inclusão do novo NCM?')) {
      const ncmParaEnviar = {
        ncm: this.tncm.ncm,
        campo1: this.tncm.campo1,
        descricao: this.tncm.descricao,
        aliquota: this.tncm.aliquota
      };

      this.ncmService.addNcm(ncmParaEnviar).subscribe({
        next: (data) => {
          this.successMessage = 'NCM adicionado com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          console.error('Erro ao cadastrar NCM:', error);
          this.errorMessage = 'Erro ao cadastrar NCM. Por favor, tente novamente.';
        }
      });
    }
  }

  onNcmChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.ncmSelecionado = this.ncms.find(p => p.id === +selectedId) ?? undefined;

    if (this.ncmSelecionado) {
      this.tncm = { ...this.ncmSelecionado };
    }
  }

  updateNcm() {
    if (window.confirm('Confirma a alteração do NCM?')) {
      if (!this.ncmSelecionado) return;

      const ncmParaEnviar = {
        ...this.tncm
      };

      this.ncmService.updateNcm(this.ncmSelecionado.id, ncmParaEnviar).subscribe({
        next: (data) => {
          this.successMessage = 'NCM atualizado com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao atualizar NCM. Por favor, tente novamente.';
        }
      });
    }
  }

  deleteNcm() {
    if (window.confirm('Confirma a exclusão do NCM?')) {
      if (!this.ncmSelecionado) return;

      this.ncmService.deleteNcm(this.ncmSelecionado.id).subscribe({
        next: (data) => {
          this.successMessage = 'NCM excluído com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao excluir NCM. Por favor, tente novamente.';
        }
      });
    }
  }
}
