import { Component } from '@angular/core';
import { CaixaService } from '../../service/caixa.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';  // Importa o Location para voltar à página anterior

@Component({
  selector: 'app-caixa',
  templateUrl: './caixa.component.html',
  styleUrls: ['./caixa.component.css']
})
export class CaixaComponent {

  dataCaixa: string;
  idLoja: number = 0;
  senhaGerente: string = '';
  caixa: any;  // Objeto para armazenar os dados do caixa

  constructor(
    private caixaService: CaixaService,
    private router: Router,
    private snackBar: MatSnackBar,
    private location: Location  // Injeta o serviço Location para navegação
  ) { 
    // Obter a data atual no fuso horário de São Paulo sem horas e minutos
    const dateInSaoPaulo = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' });
    this.dataCaixa = dateInSaoPaulo;  // O formato 'en-CA' retorna a data no formato 'YYYY-MM-DD'
  }

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

  confirmarFecharCaixa() {
    const confirmacao = window.confirm('Você tem certeza que deseja fechar o caixa?');
    if (confirmacao) {
      this.fecharCaixa();
    }
  }

  fecharCaixa() {
    if (this.caixa && this.caixa.idcaixa) {
      this.caixaService.fecharCaixa(this.caixa.idcaixa).subscribe(response => {
        this.caixa.status = 'F'; // Atualiza o status localmente para "Fechado"
        console.log('Caixa fechado:', response);

        // Exibe a mensagem de sucesso
        this.snackBar.open('Caixa fechado com sucesso!', 'OK', {
          duration: 3000,
        });

        // Redireciona para a página inicial
        this.router.navigate(['/']);
      }, error => {
        console.error('Erro ao fechar o caixa:', error);
      });
    } else {
      console.error('Caixa não encontrado para fechamento.');
    }
  }

  voltar() {
    this.router.navigate(['/']);  // Redireciona para a página inicial
  }
}
