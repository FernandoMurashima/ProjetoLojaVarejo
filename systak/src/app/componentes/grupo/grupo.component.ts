import { Component, OnInit } from '@angular/core';
import { GrupoService, Grupo, Subgrupo } from '../../service/grupo.service';
import { TiposDeSubgrupoService, TiposDeSubgrupo } from '../../service/tiposdesubgrupo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {
  grupo: Grupo = this.createEmptyGrupo();
  grupos: Grupo[] = [];
  tiposDeSubgrupo: TiposDeSubgrupo[] = [];
  selectedTiposDeSubgrupo: number[] = [];
  grupoSelecionado?: Grupo;
  selectedSubgrupoCodigos: string[] = [];
  action: string = '';

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private grupoService: GrupoService,
    private tiposDeSubgrupoService: TiposDeSubgrupoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadGrupos();
    this.loadTiposDeSubgrupo();
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
    this.action = action;
    if (action === 'consultar' || action === 'editar' || action === 'excluir') {
      this.loadGrupos();
    }
  }

  resetAction() {
    this.action = '';
    this.grupo = this.createEmptyGrupo();
    this.grupoSelecionado = undefined;
    this.selectedSubgrupoCodigos = [];
    this.successMessage = '';
    this.errorMessage = '';
    this.selectedTiposDeSubgrupo = [];
  }

  goToIndex() {
    this.router.navigate(['/home']);
  }

  loadGrupos() {
    this.grupoService.load().subscribe({
      next: (data) => {
        this.grupos = data;
        console.log('Grupos carregados: ', this.grupos);
      },
      error: (error) => {
        console.error('Erro ao carregar grupos', error);
      }
    });
  }

  loadTiposDeSubgrupo() {
    this.tiposDeSubgrupoService.load().subscribe({
      next: (data) => {
        this.tiposDeSubgrupo = data;
        console.log('Tipos de Subgrupo carregados: ', this.tiposDeSubgrupo);
      },
      error: (error) => {
        console.error('Erro ao carregar tipos de subgrupo', error);
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

      this.grupoService.addGrupo(grupoParaEnviar).subscribe({
        next: (data) => {
          this.successMessage = 'Grupo adicionado com sucesso!';
          this.createSubgrupos(data.Idgrupo);
          this.resetAction();
        },
        error: (error) => {
          console.error('Erro ao cadastrar Grupo:', error);
          this.errorMessage = 'Erro ao cadastrar Grupo. Por favor, tente novamente.';
        }
      });
    }
  }

  onTipoChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const selectedId = +checkbox.value;

    if (checkbox.checked) {
      this.selectedTiposDeSubgrupo.push(selectedId);
    } else {
      const index = this.selectedTiposDeSubgrupo.indexOf(selectedId);
      if (index > -1) {
        this.selectedTiposDeSubgrupo.splice(index, 1);
      }
    }
  }

  createSubgrupos(Idgrupo: number) {
    for (let tipoId of this.selectedTiposDeSubgrupo) {
      const tipo = this.tiposDeSubgrupo.find(t => t.Idtipodesubgrupo === tipoId);
      if (tipo) {
        const subgrupoParaEnviar = {
          idgrupo: Idgrupo,
          Codigo: tipo.codigosubgrupo,
          Descricao: tipo.Descricao,
          Margem: 0.0,
          data_cadastro: new Date()
        };
        this.grupoService.addSubgrupo(subgrupoParaEnviar).subscribe({
          next: (data) => {
            console.log('Subgrupo criado:', data);
          },
          error: (error) => {
            console.error('Erro ao criar subgrupo:', error);
          }
        });
      }
    }
  }

  onGrupoChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.grupoSelecionado = this.grupos.find(p => p.Idgrupo === +selectedId) ?? undefined;

    if (this.grupoSelecionado) {
      this.grupo = { ...this.grupoSelecionado };
      this.loadGrupoSubgrupos(this.grupoSelecionado.Idgrupo);
    }
  }

  loadGrupoSubgrupos(Idgrupo: number) {
    this.grupoService.getSubgrupos(Idgrupo).subscribe({
      next: (data) => {
        this.selectedSubgrupoCodigos = data.map(subgrupo => subgrupo.Codigo);
        console.log('Subgrupos carregados para o grupo: ', data);
        console.log('Códigos dos subgrupos selecionados: ', this.selectedSubgrupoCodigos);
      },
      error: (error) => {
        console.error('Erro ao carregar subgrupos do grupo', error);
      }
    });
  }

  updateGrupo() {
    if (window.confirm('Confirma a alteração do grupo?')) {
      if (!this.grupoSelecionado) return;

      const grupoParaEnviar = { ...this.grupo };

      this.grupoService.updateGrupo(this.grupoSelecionado.Idgrupo, grupoParaEnviar).subscribe({
        next: (data) => {
          this.updateSubgrupos(this.grupoSelecionado!.Idgrupo);
          this.successMessage = 'Grupo atualizado com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao atualizar Grupo. Por favor, tente novamente.';
        }
      });
    }
  }

  updateSubgrupos(Idgrupo: number) {
    this.grupoService.deleteSubgrupos(Idgrupo).subscribe({
      next: () => {
        this.createSubgrupos(Idgrupo);
      },
      error: (error) => {
        console.error('Erro ao atualizar subgrupos do grupo', error);
      }
    });
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

