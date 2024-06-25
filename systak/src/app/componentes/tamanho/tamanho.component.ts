import { Component, OnInit } from '@angular/core';
import { TamanhoService, Tamanho } from '../../service/tamanho.service';
import { GradeService, Grade } from '../../service/grade.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tamanho',
  templateUrl: './tamanho.component.html',
  styleUrls: ['./tamanho.component.css']
})
export class TamanhoComponent implements OnInit {
  ttamanho: Tamanho = this.createEmptyTamanho();
  tamanhos: (Tamanho & { gradeDescricao?: string })[] = [];
  tamanhoSelecionado?: Tamanho & { gradeDescricao?: string };
  grades: Grade[] = [];
  action: string = '';

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private tamanhoService: TamanhoService, private gradeService: GradeService, private router: Router) {}

  ngOnInit(): void {
    this.loadTamanhos();
    this.loadGrades();
  }

  createEmptyTamanho(): Tamanho {
    return {
      Idtamanho: 0,
      idgrade: 0,
      Tamanho: '',
      Status: '',
      data_cadastro: new Date()
    };
  }

  setAction(action: string) {
    console.log('Ação definida:', action);
    this.action = action;
    if (action === 'consultar' || action === 'editar' || action === 'excluir') {
      this.loadTamanhos();
    }
  }

  resetAction() {
    this.action = '';
    this.ttamanho = this.createEmptyTamanho();
    this.tamanhoSelecionado = undefined;
    this.successMessage = '';
    this.errorMessage = '';
  }

  goToIndex() {
    this.router.navigate(['/home']);
  }

  loadTamanhos() {
    this.tamanhoService.load().subscribe({
      next: (data) => {
        this.tamanhos = data.map(tamanho => {
          const grade = this.grades.find(g => g.Idgrade === tamanho.idgrade);
          return { ...tamanho, gradeDescricao: grade ? grade.Descricao : '' };
        });
      },
      error: (error) => {
        console.error('Erro ao carregar tamanhos', error);
      }
    });
  }

  loadGrades() {
    this.gradeService.load().subscribe({
      next: (data) => {
        this.grades = data;
        this.loadTamanhos(); // Recarrega os tamanhos após carregar as grades
      },
      error: (error) => {
        console.error('Erro ao carregar grades', error);
      }
    });
  }

  addTamanho() {
    if (window.confirm('Confirma a inclusão do novo tamanho?')) {
      const tamanhoParaEnviar = {
        idgrade: this.ttamanho.idgrade,
        Tamanho: this.ttamanho.Tamanho,
        Status: this.ttamanho.Status,
        data_cadastro: this.ttamanho.data_cadastro
      };

      this.tamanhoService.addTamanho(tamanhoParaEnviar).subscribe({
        next: (data) => {
          this.successMessage = 'Tamanho adicionado com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          console.error('Erro ao cadastrar Tamanho:', error);
          this.errorMessage = 'Erro ao cadastrar Tamanho. Por favor, tente novamente.';
        }
      });
    }
  }

  onTamanhoChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.tamanhoSelecionado = this.tamanhos.find(p => p.Idtamanho === +selectedId) ?? undefined;

    if (this.tamanhoSelecionado) {
      this.ttamanho = { ...this.tamanhoSelecionado };
    }
  }

  updateTamanho() {
    if (window.confirm('Confirma a alteração do tamanho?')) {
      if (!this.tamanhoSelecionado) return;

      const tamanhoParaEnviar = {
        ...this.ttamanho
      };
      this.tamanhoService.updateTamanho(this.tamanhoSelecionado.Idtamanho, tamanhoParaEnviar).subscribe({
        next: (data) => {
          this.successMessage = 'Tamanho atualizado com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao atualizar Tamanho. Por favor, tente novamente.';
        }
      });
    }
  }

  deleteTamanho() {
    if (window.confirm('Confirma a exclusão do tamanho?')) {
      if (!this.tamanhoSelecionado) return;

      this.tamanhoService.deleteTamanho(this.tamanhoSelecionado.Idtamanho).subscribe({
        next: (data) => {
          this.successMessage = 'Tamanho excluído com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao excluir Tamanho. Por favor, tente novamente.';
        }
      });
    }
  }
}
