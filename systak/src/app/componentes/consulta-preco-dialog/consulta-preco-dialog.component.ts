import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProdutoService } from '../../service/produto.service';

@Component({
  selector: 'app-consulta-preco-dialog',
  templateUrl: './consulta-preco-dialog.component.html',
  styleUrls: ['./consulta-preco-dialog.component.css']
})
export class ConsultaPrecoDialogComponent {
  codigoBarra: string = '';
  preco: number | null = null;
  produtoFoto: string | null = null;
  errorMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<ConsultaPrecoDialogComponent>,
    private produtoService: ProdutoService
  ) {}

  consultarPreco() {
    this.produtoService.getPrecoECodigoProduto(this.codigoBarra).subscribe({
      next: (data: any) => {
        this.preco = data.preco;
        this.produtoFoto = data.produto_foto;
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = 'Produto não encontrado';
        this.preco = null;
        this.produtoFoto = null;
      }
    });
  }

  fecharDialogo() {
    this.dialogRef.close();
  }
}
