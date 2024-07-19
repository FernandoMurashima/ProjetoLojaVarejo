import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { AuthGuardService } from './service/auth-guard.service';
import { LoginComponent } from './componentes/login/login.component';
import { IndexComponent } from './componentes/index/index.component';
import { ClienteComponent } from './componentes/cliente/cliente.component';
import { FornecedorComponent } from './componentes/fornecedor/fornecedor.component';
import { VendedorComponent } from './componentes/vendedor/vendedor.component';
import { FuncionarioComponent } from './componentes/funcionario/funcionario.component';
import { LojaComponent } from './componentes/loja/loja.component';
import { UserComponent } from './componentes/user/user.component'; 
import { NatLancamentoComponent } from './componentes/nat-lancamento/nat-lancamento.component'; 
import { ProdutoComponent } from './componentes/produto/produto.component';
import { UnidadeComponent } from './componentes/unidade/unidade.component';
import { ColecaoComponent } from './componentes/colecao/colecao.component';
import { MaterialComponent } from './componentes/material/material.component';
import { FamiliaComponent } from './componentes/familia/familia.component';
import { CorComponent } from './componentes/cor/cor.component';
import { GradeComponent } from './componentes/grade/grade.component';
import { TamanhoComponent } from './componentes/tamanho/tamanho.component';
import { NcmComponent } from './componentes/ncm/ncm.component';
import { GrupoComponent } from './componentes/grupo/grupo.component';
import { SubgrupoComponent } from './componentes/subgrupo/subgrupo.component';
import { GrupoDetalheComponent } from './componentes/grupodetalhe/grupodetalhe.component';
import { TabelaPrecoComponent } from './componentes/tabela-preco/tabela-preco.component';
import { EstoqueInicialComponent } from './componentes/estoque-inicial/estoque-inicial.component';
import { PdvComponent } from './componentes/pdv/pdv.component';
import { TesteProdutoComponent } from './componentes/teste-produto/teste-produto.component';

export const DEFAULT_ROUTE = '/index';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '', redirectTo: '/teste-produto', pathMatch: 'full' },
  { path: 'configuradores/teste-produto', component: TesteProdutoComponent,canActivate: [AuthGuardService] },
  { path: 'index', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cadastro/clientes', component: ClienteComponent, canActivate: [AuthGuardService] },
  { path: 'cadastro/fornecedores', component: FornecedorComponent, canActivate: [AuthGuardService] },
  { path: 'cadastro/vendedores', component: VendedorComponent, canActivate: [AuthGuardService] },
  { path: 'cadastro/funcionarios', component: FuncionarioComponent, canActivate: [AuthGuardService] },
  { path: 'cadastro/lojas', component: LojaComponent, canActivate: [AuthGuardService] },
  { path: 'cadastro/users', component: UserComponent, canActivate: [AuthGuardService] },
  { path: 'financeiro', component: HomeComponent },
  { path: 'venda', component: HomeComponent },
  { path: 'vendas/tabela-preco', canActivate: [AuthGuardService], component: TabelaPrecoComponent },
  { path: 'estoque', component: HomeComponent },
  { path: 'relatorios', component: HomeComponent },
  { path: 'configuradores/natureza-lancamentos', component: NatLancamentoComponent, canActivate: [AuthGuardService] },
  { path: 'configuradores/unidade', component: UnidadeComponent, canActivate: [AuthGuardService] },
  { path: 'configuradores/colecao', component: ColecaoComponent, canActivate: [AuthGuardService] },
  { path: 'configuradores/material', component: MaterialComponent, canActivate: [AuthGuardService] },
  { path: 'configuradores/familia', component: FamiliaComponent, canActivate: [AuthGuardService] },
  { path: 'configuradores/cores', component: CorComponent, canActivate: [AuthGuardService] },
  { path: 'configuradores/grades', component: GradeComponent, canActivate: [AuthGuardService] },
  { path: 'configuradores/tamanhos', component: TamanhoComponent, canActivate: [AuthGuardService] },
  { path: 'estoque/ncm', component: NcmComponent, canActivate: [AuthGuardService] },
  { path: 'estoque/grupo', component: GrupoComponent, canActivate: [AuthGuardService] },
  { path: 'estoque/subgrupos', component: SubgrupoComponent, canActivate: [AuthGuardService] },
  { path: 'estoque/grupodetalhe', component: GrupoDetalheComponent, canActivate: [AuthGuardService] },
  { path: 'cadastro/produtos', component: ProdutoComponent, canActivate: [AuthGuardService] },
  { path: 'estoque-inicial', component: EstoqueInicialComponent, canActivate: [AuthGuardService] },
  { path: 'vendas/pdv', component: PdvComponent, canActivate: [AuthGuardService]},  
  { path: 'sair', component: LoginComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
