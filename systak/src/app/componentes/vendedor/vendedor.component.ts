import { Component, OnInit } from '@angular/core';
import { VendedorService, Vendedor } from '../../service/vendedor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendedor',
  templateUrl: './vendedor.component.html',
  styleUrls: ['./vendedor.component.css']
})
export class VendedorComponent implements OnInit {
  vendedor: Vendedor = this.createEmptyVendedor();
  vendedores: Vendedor[] = [];
  vendedorSelecionado?: Vendedor;
  action: string = '';

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private vendedorService: VendedorService, private router: Router) {}

  ngOnInit(): void {
    this.loadVendedores();
  }

  createEmptyVendedor(): Vendedor {
    return {
      Idvendedor: 0,
      nomevendedor: '',
      apelido: '',
      cpf: '',
      aniversario: new Date(),
      fim: new Date(),
      categoria: '',
      data_cadastro: new Date(),
      idloja: 0
    };
  }

  setAction(action: string) {
    this.action = action;
    if (action === 'consultar' || action === 'editar' || action === 'excluir') {
      this.loadVendedores();
    }
  }

  resetAction() {
    this.action = '';
    this.vendedor = this.createEmptyVendedor();
    this.vendedorSelecionado = undefined;
    this.successMessage = '';
    this.errorMessage = '';
  }

  goToIndex() {
    this.router.navigate(['/home']);
  }

  loadVendedores() {
    this.vendedorService.load().subscribe({
      next: (data) => {
        this.vendedores = data;
      },
      error: (error) => {
        console.error('Erro ao carregar vendedores', error);
      }
    });
  }

  addVendedor() {
    if (window.confirm('Confirma a inclusão do novo vendedor?')) {
      const vendedorData = this.prepareVendedorData(this.vendedor);
      this.vendedorService.addVendedor(vendedorData).subscribe({
        next: (data) => {
          this.successMessage = 'Vendedor adicionado com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao cadastrar Vendedor. Por favor, tente novamente.';
          console.error(error);
        }
      });
    }
  }

  onVendedorChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.vendedorSelecionado = this.vendedores.find(p => p.Idvendedor === +selectedId) ?? undefined;

    if (this.vendedorSelecionado) {
      this.vendedor = { ...this.vendedorSelecionado };
    }
  }

  updateVendedor() {
    if (window.confirm('Confirma a alteração do vendedor?')) {
      if (!this.vendedorSelecionado) return;

      const vendedorData = this.prepareVendedorData(this.vendedor);
      this.vendedorService.updateVendedor(this.vendedorSelecionado.Idvendedor, vendedorData).subscribe({
        next: (data) => {
          this.successMessage = 'Vendedor atualizado com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao atualizar Vendedor. Por favor, tente novamente.';
          console.error(error);
        }
      });
    }
  }

  deleteVendedor() {
    if (window.confirm('Confirma a exclusão do vendedor?')) {
      if (!this.vendedorSelecionado) return;

      this.vendedorService.deleteVendedor(this.vendedorSelecionado.Idvendedor).subscribe({
        next: (data) => {
          this.successMessage = 'Vendedor excluído com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao excluir Vendedor. Por favor, tente novamente.';
          console.error(error);
        }
      });
    }
  }

  prepareVendedorData(vendedor: Vendedor): Vendedor {
    return {
      ...vendedor,
      aniversario: this.formatDate(vendedor.aniversario),
      fim: this.formatDate(vendedor.fim),
      data_cadastro: this.formatDate(vendedor.data_cadastro)
    };
  }

  formatDate(date: any): any {
    if (!date) return null;
    if (typeof date === 'string') return date;
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }
}
