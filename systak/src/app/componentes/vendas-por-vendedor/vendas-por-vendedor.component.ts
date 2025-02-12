import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-vendas-por-vendedor',
  templateUrl: './vendas-por-vendedor.component.html',
  styleUrls: ['./vendas-por-vendedor.component.css']
})
export class VendasPorVendedorComponent implements OnInit {
  lojas: any[] = [];
  lojaId: string = '';
  dataInicio: string = '';
  dataFim: string = '';
  resultadoVendas: any[] = [];
  nomeLoja: string = '';  // Variável para armazenar o nome da loja

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadLojas();
  }

  loadLojas(): void {
    const apiUrl = `${environment.apiURL}/lojas/`;
    this.http.get<any[]>(apiUrl).subscribe(data => {
      this.lojas = data;
    });
  }

  consultarVendas(): void {
    let url = `${environment.apiURL}/vendas_por_vendedor/?loja_id=${this.lojaId}&data_inicio=${this.dataInicio}`;

    if (this.dataFim) {
      url += `&data_fim=${this.dataFim}`;
    }

    this.http.get<any>(url).subscribe(data => {
        this.nomeLoja = data.nome_loja;  // Armazena o nome da loja
        this.resultadoVendas = data.resultado_vendas;
    }, error => {
        console.error('Erro ao buscar vendas:', error);
    });
  }
}
