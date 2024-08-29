import { Component } from '@angular/core';
import { CaixaService } from '../../service/caixa.service';

@Component({
  selector: 'app-caixa',
  templateUrl: './caixa.component.html',
  styleUrls: ['./caixa.component.css']
})
export class CaixaComponent {

  dataCaixa = new Date().toISOString().substring(0, 10);
  idLoja: number = 0;
  senhaGerente: string = '';
  caixa: any;  // Objeto para armazenar os dados do caixa

  constructor(private caixaService: CaixaService) { }

  abrirCaixa() {
    const data = {
      idloja: this.idLoja,
      data: this.dataCaixa,
      senha_gerente: this.senhaGerente  // Este campo não será utilizado no backend neste momento
    };

    this.caixaService.abrirCaixa(data).subscribe(response => {
      this.caixa = response;  // Armazena os dados do caixa para exibição
      console.log('Caixa aberto:', response);
    }, error => {
      console.error('Erro ao abrir o caixa:', error);
    });
  }
}
