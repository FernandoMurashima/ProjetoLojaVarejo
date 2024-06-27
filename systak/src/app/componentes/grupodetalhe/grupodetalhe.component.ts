import { Component, OnInit } from '@angular/core';
import { GrupoService, Grupo } from '../../service/grupo.service';
import { SubgrupoService, Subgrupo } from '../../service/subgrupo.service';
import { GrupoDetalheService, GrupoDetalhe } from '../../service/grupodetalhe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grupodetalhe',
  templateUrl: './grupodetalhe.component.html',
  styleUrls: ['./grupodetalhe.component.css']
})
export class GrupoDetalheComponent implements OnInit {
  grupoDetalhe: GrupoDetalhe = this.createEmptyGrupoDetalhe();
  grupos: Grupo[] = [];
  subgrupos: Subgrupo[] = [];
  subgruposDoGrupo: Subgrupo[] = [];
  grupoSelecionado?: Grupo;
  action: string = '';

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private grupoService: GrupoService,
    private subgrupoService: SubgrupoService,
    private grupoDetalheService: GrupoDetalheService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadGrupos();
    this.loadSubgrupos();
  }

  createEmptyGrupoDetalhe(): GrupoDetalhe {
    return {
      IdGrupoDetalhe: 0,
      idgrupo: 0,
      idsubgrupo: 0
    };
  }

  setAction(action: string) {
    this.action = action;
    if (action === 'consultar') {
      this.loadGrupos();
    }
  }

  resetAction() {
    this.action = '';
    this.grupoDetalhe = this.createEmptyGrupoDetalhe();
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

  onGrupoChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.grupoSelecionado = this.grupos.find(p => p.Idgrupo === +selectedId) ?? undefined;

    if (this.grupoSelecionado) {
      this.loadSubgruposDoGrupo(this.grupoSelecionado.Idgrupo);
    }
  }

  loadSubgruposDoGrupo(idgrupo: number) {
    this.grupoDetalheService.loadByGrupo(idgrupo).subscribe({
      next: (data) => {
        this.subgruposDoGrupo = data;
      },
      error: (error) => {
        console.error('Erro ao carregar subgrupos do grupo', error);
      }
    });
  }

  addGrupoDetalhe() {
    if (window.confirm('Confirma a inclusão do subgrupo no grupo?')) {
      const grupoDetalheParaEnviar: GrupoDetalhe = {
        idgrupo: this.grupoDetalhe.idgrupo,
        idsubgrupo: this.grupoDetalhe.idsubgrupo
      };
  
      this.grupoDetalheService.addGrupoDetalhe(grupoDetalheParaEnviar).subscribe({
        next: (data) => {
          this.successMessage = 'Subgrupo adicionado ao grupo com sucesso!';
          this.errorMessage = ''; // Limpa a mensagem de erro em caso de sucesso
          this.resetAction();
        },
        error: (error) => {
          console.error('Erro ao adicionar subgrupo ao grupo:', error);
          this.errorMessage = error.error?.error || 'Erro ao adicionar subgrupo ao grupo. Por favor, tente novamente.';
        }
      });
    }
  }
  
}
