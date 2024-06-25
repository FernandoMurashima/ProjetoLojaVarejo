import { Component, OnInit } from '@angular/core';
import { GradeService, Grade } from '../../service/grade.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit {
  grade: Grade = this.createEmptyGrade();
  grades: Grade[] = [];
  gradeSelecionada?: Grade;
  action: string = '';

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private gradeService: GradeService, private router: Router) {}

  ngOnInit(): void {
    this.loadGrades();
  }

  createEmptyGrade(): Grade {
    return {
      Idgrade: 0,
      Descricao: '',
      Status: '',
      data_cadastro: new Date()
    };
  }

  setAction(action: string) {
    this.action = action;
    if (action === 'consultar' || action === 'editar' || action === 'excluir') {
      this.loadGrades();
    }
  }

  resetAction() {
    this.action = '';
    this.grade = this.createEmptyGrade();
    this.gradeSelecionada = undefined;
    this.successMessage = '';
    this.errorMessage = '';
  }

  goToIndex() {
    this.router.navigate(['/home']);
  }

  loadGrades() {
    this.gradeService.load().subscribe({
      next: (data: Grade[]) => {
        this.grades = data;
      },
      error: (error: any) => {
        console.error('Erro ao carregar grades', error);
      }
    });
  }

  addGrade() {
    if (window.confirm('Confirma a inclusão da nova grade?')) {
      const gradeParaEnviar = {
        Descricao: this.grade.Descricao,
        Status: this.grade.Status,
        data_cadastro: this.grade.data_cadastro
      };

      this.gradeService.addGrade(gradeParaEnviar).subscribe({
        next: (data: Grade) => {
          this.successMessage = 'Grade adicionada com sucesso!';
          this.resetAction();
        },
        error: (error: any) => {
          console.error('Erro ao cadastrar Grade:', error);
          this.errorMessage = 'Erro ao cadastrar Grade. Por favor, tente novamente.';
        }
      });
    }
  }

  onGradeChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.gradeSelecionada = this.grades.find(p => p.Idgrade === +selectedId) ?? undefined;

    if (this.gradeSelecionada) {
      this.grade = { ...this.gradeSelecionada };
    }
  }

  updateGrade() {
    if (window.confirm('Confirma a alteração da grade?')) {
      if (!this.gradeSelecionada) return;

      const gradeParaEnviar = {
        ...this.grade
      };
      this.gradeService.updateGrade(this.gradeSelecionada.Idgrade, gradeParaEnviar).subscribe({
        next: (data: Grade) => {
          this.successMessage = 'Grade atualizada com sucesso!';
          this.resetAction();
        },
        error: (error: any) => {
          this.errorMessage = 'Erro ao atualizar Grade. Por favor, tente novamente.';
        }
      });
    }
  }

  deleteGrade() {
    if (window.confirm('Confirma a exclusão da grade?')) {
      if (!this.gradeSelecionada) return;

      this.gradeService.deleteGrade(this.gradeSelecionada.Idgrade).subscribe({
        next: (data: any) => {
          this.successMessage = 'Grade excluída com sucesso!';
          this.resetAction();
        },
        error: (error: any) => {
          this.errorMessage = 'Erro ao excluir Grade. Por favor, tente novamente.';
        }
      });
    }
  }
}
