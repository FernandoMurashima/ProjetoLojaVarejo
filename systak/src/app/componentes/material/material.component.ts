import { Component, OnInit } from '@angular/core';
import { MaterialService, Material } from '../../service/material.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  material: Material = this.createEmptyMaterial();
  materiais: Material[] = [];
  materialSelecionado?: Material;
  action: string = '';

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private materialService: MaterialService, private router: Router) {}

  ngOnInit(): void {
    this.loadMateriais();
  }

  createEmptyMaterial(): Material {
    return {
      Idmaterial: 0,
      Descricao: '',
      Codigo: '',
      Status: '',
      data_cadastro: new Date()
    };
  }

  setAction(action: string) {
    this.action = action;
    if (action === 'consultar' || action === 'editar' || action === 'excluir') {
      this.loadMateriais();
    }
  }

  resetAction() {
    this.action = '';
    this.material = this.createEmptyMaterial();
    this.materialSelecionado = undefined;
    this.successMessage = '';
    this.errorMessage = '';
  }

  goToIndex() {
    this.router.navigate(['/home']);
  }

  loadMateriais() {
    this.materialService.load().subscribe({
      next: (data) => {
        this.materiais = data;
      },
      error: (error) => {
        console.error('Erro ao carregar materiais', error);
      }
    });
  }

  addMaterial() {
    if (window.confirm('Confirma a inclusão do novo material?')) {
      const materialParaEnviar = {
        Descricao: this.material.Descricao,
        Codigo: this.material.Codigo,
        Status: this.material.Status,
        data_cadastro: this.material.data_cadastro
      };

      this.materialService.addMaterial(materialParaEnviar).subscribe({
        next: (data) => {
          this.successMessage = 'Material adicionado com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          console.error('Erro ao cadastrar Material:', error);
          this.errorMessage = 'Erro ao cadastrar Material. Por favor, tente novamente.';
        }
      });
    }
  }

  onMaterialChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.materialSelecionado = this.materiais.find(p => p.Idmaterial === +selectedId) ?? undefined;

    if (this.materialSelecionado) {
      this.material = { ...this.materialSelecionado };
    }
  }

  updateMaterial() {
    if (window.confirm('Confirma a alteração do material?')) {
      if (!this.materialSelecionado) return;

      const materialParaEnviar = {
        ...this.material
      };
      this.materialService.updateMaterial(this.materialSelecionado.Idmaterial, materialParaEnviar).subscribe({
        next: (data) => {
          this.successMessage = 'Material atualizado com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao atualizar Material. Por favor, tente novamente.';
        }
      });
    }
  }

  deleteMaterial() {
    if (window.confirm('Confirma a exclusão do material?')) {
      if (!this.materialSelecionado) return;

      this.materialService.deleteMaterial(this.materialSelecionado.Idmaterial).subscribe({
        next: (data) => {
          this.successMessage = 'Material excluído com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao excluir Material. Por favor, tente novamente.';
        }
      });
    }
  }
}
