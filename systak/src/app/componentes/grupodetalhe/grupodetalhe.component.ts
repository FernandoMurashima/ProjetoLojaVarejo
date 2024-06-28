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
    this.subgruposDoGrupo = [];
    this.successMessage = '';
    this.errorMessage = '';
  }

  goToIndex() {
    this.router.navigate(['/home']);
  }

  loadGrupos() {
    this.grupoService.load().subscribe({
      next: (data) => {
        console.log('Grupos carregados:', data);
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
        console.log('Subgrupos carregados:', data);
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
    console.log('Grupo selecionado:', this.grupoSelecionado);

    if (this.grupoSelecionado) {
      this.loadSubgruposDoGrupo(this.grupoSelecionado.Idgrupo);
    }
  }

  loadSubgruposDoGrupo(idgrupo: number) {
    this.grupoDetalheService.loadByGrupo(idgrupo).subscribe({
      next: (data: GrupoDetalhe[]) => {
        console.log('Subgrupos do grupo carregados:', data);
        this.subgruposDoGrupo = data
          .filter(detail => detail.idgrupo === idgrupo)
          .map(detail => this.subgrupos.find(subgrupo => subgrupo.Idsubgrupo === detail.idsubgrupo)!)
          .filter(subgrupo => subgrupo !== undefined) as Subgrupo[];
      },
      error: (error) => {
        console.error('Erro ao carregar subgrupos do grupo', error);
      }
    });
  }

  getSubgrupoDescricao(Idsubgrupo: number): string {
    const subgrupo = this.subgrupos.find(sg => sg.Idsubgrupo === Idsubgrupo);
    return subgrupo ? subgrupo.Descricao : 'Descrição não encontrada';
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
