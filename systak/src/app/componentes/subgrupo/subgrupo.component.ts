import { Component, OnInit } from '@angular/core';
import { SubgrupoService, Subgrupo } from '../../service/subgrupo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subgrupo',
  templateUrl: './subgrupo.component.html',
  styleUrls: ['./subgrupo.component.css']
})
export class SubgrupoComponent implements OnInit {
  subgrupo: Subgrupo = this.createEmptySubgrupo();
  subgrupos: Subgrupo[] = [];
  subgrupoSelecionado?: Subgrupo;
  action: string = '';

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private subgrupoService: SubgrupoService, private router: Router) {}

  ngOnInit(): void {
    this.loadSubgrupos();
  }

  createEmptySubgrupo(): Subgrupo {
    return {
      Idsubgrupo: 0,
      Descricao: '',
      Margem: 0,
      data_cadastro: new Date()
    };
  }

  setAction(action: string) {
    console.log('Ação definida:', action);
    this.action = action;
    if (action === 'consultar' || action === 'editar' || action === 'excluir') {
      this.loadSubgrupos();
    }
  }

  resetAction() {
    this.action = '';
    this.subgrupo = this.createEmptySubgrupo();
    this.subgrupoSelecionado = undefined;
    this.successMessage = '';
    this.errorMessage = '';
  }

  goToIndex() {
    this.router.navigate(['/home']);
  }

  loadSubgrupos() {
    this.subgrupoService.load().subscribe({
      next: (data) => {
        this.subgrupos = data;
      },
      error: (error) => {
        console.error('Erro ao carregar subgrupos', error);
      }
    });
  }

  addSubgrupo() {
    if (window.confirm('Confirma a inclusão do novo subgrupo?')) {
      const subgrupoParaEnviar = {
        Descricao: this.subgrupo.Descricao,
        Margem: this.subgrupo.Margem,
        data_cadastro: this.subgrupo.data_cadastro
      };

      console.log("Dados do subgrupo para envio:", subgrupoParaEnviar);
      this.subgrupoService.addSubgrupo(subgrupoParaEnviar).subscribe({
        next: (data) => {
          this.successMessage = 'Subgrupo adicionado com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          console.error('Erro ao cadastrar Subgrupo:', error);
          this.errorMessage = 'Erro ao cadastrar Subgrupo. Por favor, tente novamente.';
        }
      });
    }
  }

  onSubgrupoChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.subgrupoSelecionado = this.subgrupos.find(p => p.Idsubgrupo === +selectedId) ?? undefined;

    if (this.subgrupoSelecionado) {
      this.subgrupo = { ...this.subgrupoSelecionado };
    }
  }

  updateSubgrupo() {
    if (window.confirm('Confirma a alteração do subgrupo?')) {
      if (!this.subgrupoSelecionado) return;

      const subgrupoParaEnviar = {
        ...this.subgrupo
      };
      this.subgrupoService.updateSubgrupo(this.subgrupoSelecionado.Idsubgrupo, subgrupoParaEnviar).subscribe({
        next: (data) => {
          this.successMessage = 'Subgrupo atualizado com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao atualizar Subgrupo. Por favor, tente novamente.';
        }
      });
    }
  }

  deleteSubgrupo() {
    if (window.confirm('Confirma a exclusão do subgrupo?')) {
      if (!this.subgrupoSelecionado) return;

      this.subgrupoService.deleteSubgrupo(this.subgrupoSelecionado.Idsubgrupo).subscribe({
        next: (data) => {
          this.successMessage = 'Subgrupo excluído com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao excluir Subgrupo. Por favor, tente novamente.';
        }
      });
    }
  }
}
