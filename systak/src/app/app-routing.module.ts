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

export const DEFAULT_ROUTE = '/index';

const routes: Routes = [
  { path: '', component: HomeComponent },
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
  { path: 'estoque', component: HomeComponent },
  { path: 'relatorios', component: HomeComponent },
  { path: 'sair', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
