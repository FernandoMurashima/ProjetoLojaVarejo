import { Component, OnInit } from '@angular/core';
import { GrupoService, Grupo } from '../../service/grupo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {
  grupo: Grupo = this.createEmptyGrupo();
  grupos: Grupo[] = [];
  grupoSelecionado?: Grupo;
  action: string = '';

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private grupoService: GrupoService, private router: Router) {}

  ngOnInit(): void {
    this.loadGrupos();
  }

  createEmptyGrupo(): Grupo {
    return {
      Idgrupo: 0,
      Codigo: '',
      Descricao: '',
      Margem: 0,
      data_cadastro: new Date()
    };
  }

  setAction(action: string) {
    console.log('Ação definida:', action);
    this.action = action;
    if (action === 'consultar' || action === 'editar' || action === 'excluir') {
      this.loadGrupos();
    }
  }

  resetAction() {
    this.action = '';
    this.grupo = this.createEmptyGrupo();
    this.grupoSelecionado = undefined;
    this.successMessage = '';
    this.errorMessage = '';
  }

  goToIndex() {
    this.router.navigate(['/home']);
  }

  loadGrupos() {
    this.grupoService.load().subscribe({
      next: (data) => {
        this.grupos = data;
      },
      error: (error) => {
        console.error('Erro ao carregar grupos', error);
      }
    });
  }

  addGrupo() {
    if (window.confirm('Confirma a inclusão do novo grupo?')) {
      const grupoParaEnviar = {
        Codigo: this.grupo.Codigo,
        Descricao: this.grupo.Descricao,
        Margem: this.grupo.Margem,
        data_cadastro: this.grupo.data_cadastro
      };

      console.log("Dados do grupo para envio:", grupoParaEnviar);
      this.grupoService.addGrupo(grupoParaEnviar).subscribe({
        next: (data) => {
          this.successMessage = 'Grupo adicionado com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          console.error('Erro ao cadastrar Grupo:', error);
          this.errorMessage = 'Erro ao cadastrar Grupo. Por favor, tente novamente.';
        }
      });
    }
  }

  onGrupoChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.grupoSelecionado = this.grupos.find(p => p.Idgrupo === +selectedId) ?? undefined;

    if (this.grupoSelecionado) {
      this.grupo = { ...this.grupoSelecionado };
    }
  }

  updateGrupo() {
    if (window.confirm('Confirma a alteração do grupo?')) {
      if (!this.grupoSelecionado) return;

      const grupoParaEnviar = {
        ...this.grupo
      };
      this.grupoService.updateGrupo(this.grupoSelecionado.Idgrupo, grupoParaEnviar).subscribe({
        next: (data) => {
          this.successMessage = 'Grupo atualizado com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao atualizar Grupo. Por favor, tente novamente.';
        }
      });
    }
  }

  deleteGrupo() {
    if (window.confirm('Confirma a exclusão do grupo?')) {
      if (!this.grupoSelecionado) return;

      this.grupoService.deleteGrupo(this.grupoSelecionado.Idgrupo).subscribe({
        next: (data) => {
          this.successMessage = 'Grupo excluído com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao excluir Grupo. Por favor, tente novamente.';
        }
      });
    }
  }
}
