import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-vendas-por-vendedor',
  templateUrl: './vendas-por-vendedor.component.html',
  styleUrls: ['./vendas-por-vendedor.component.css']
})
export class VendasPorVendedorComponent implements OnInit {
  lojas: any[] = []; // Carregue as lojas da sua API
  lojaId: string = '';
  dataInicio: string = '';
  dataFim: string = '';
  resultadoVendas: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadLojas();
  }

  loadLojas(): void {
    const apiUrl = `${environment.apiURL}/lojas/`; // Usando a URL da API do environment
    this.http.get<any[]>(apiUrl).subscribe(data => {
      this.lojas = data;
    });
  }

  consultarVendas(): void {
    // Monta a URL correta usando a baseURL do environment
    const url = `${environment.apiURL}/vendas_por_vendedor/?loja_id=${this.lojaId}&data_inicio=${this.dataInicio}&data_fim=${this.dataFim}`;
    this.http.get<any>(url).subscribe(data => {
        this.resultadoVendas = data.resultado_vendas;
    }, error => {
        console.error('Erro ao buscar vendas:', error);
    });
}

}
