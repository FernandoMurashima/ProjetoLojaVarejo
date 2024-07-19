import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { IndexComponent } from './componentes/index/index.component';
import { ClienteComponent } from './componentes/cliente/cliente.component';
import { FornecedorComponent } from './componentes/fornecedor/fornecedor.component';
import { CpfValidatorDirective } from './Arquivos/cpf-validator.directive';
import { CnpjValidatorDirective } from './Arquivos/cnpj-validator-directive';
import { PhoneMaskDirective } from './Arquivos/phone-mask.directive';
import { CepMaskDirective } from './Arquivos/cep-mask.directive';
import { SafeUrlPipe } from './safe-url.pipe';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthInterceptor } from './service/auth.interceptor';
import { AuthService } from './service/auth.service';
import { VendedorComponent } from './componentes/vendedor/vendedor.component';
import { FuncionarioComponent } from './componentes/funcionario/funcionario.component';
import { LojaComponent } from './componentes/loja/loja.component';
import { UserComponent } from './componentes/user/user.component';
import { NatLancamentoComponent } from './componentes/nat-lancamento/nat-lancamento.component';
import { ProdutoComponent } from './componentes/produto/produto.component';
import { ColecaoComponent } from './componentes/colecao/colecao.component';
import { MaterialComponent } from './componentes/material/material.component';
import { UnidadeComponent } from './componentes/unidade/unidade.component';
import { FamiliaComponent } from './componentes/familia/familia.component';
import { CorComponent } from './componentes/cor/cor.component';
import { TamanhoComponent } from './componentes/tamanho/tamanho.component';
import { GradeComponent } from './componentes/grade/grade.component';
import { NcmComponent } from './componentes/ncm/ncm.component';
import { PdvComponent } from './componentes/pdv/pdv.component';
import { GrupoComponent } from './componentes/grupo/grupo.component';
import { SubgrupoComponent } from './componentes/subgrupo/subgrupo.component';

import { GrupoService } from './service/grupo.service';
import { SubgrupoService } from './service/subgrupo.service';
import { TiposDeSubgrupoService } from './service/tiposdesubgrupo.service';
import { GrupoDetalheComponent } from './componentes/grupodetalhe/grupodetalhe.component';
import { TabelaPrecoComponent } from './componentes/tabela-preco/tabela-preco.component';
import { TabelaPrecoItem, TabelaPrecoItemService } from './service/tabela-precoitem.service';
import { EstoqueService } from './service/estoque.service';
import { LojaService } from './service/loja.service';
import { EstoqueInicialComponent } from './componentes/estoque-inicial/estoque-inicial.component';
import { TesteProdutoComponent } from './componentes/teste-produto/teste-produto.component';


@NgModule({
  declarations: [
    AppComponent,
    SafeUrlPipe,
    LoginComponent,
    HomeComponent,
    IndexComponent,
    ClienteComponent,
    FornecedorComponent,
    CpfValidatorDirective,
    CnpjValidatorDirective,
    PhoneMaskDirective,
    VendedorComponent,
    FuncionarioComponent,
    LojaComponent,
    UserComponent,
    NatLancamentoComponent,
    CepMaskDirective,
    ColecaoComponent,
    MaterialComponent,
    UnidadeComponent,
    FamiliaComponent,
    CorComponent,
    TamanhoComponent,
    GradeComponent,
    NcmComponent,
    PdvComponent,
    GrupoComponent,
    SubgrupoComponent,
    GrupoDetalheComponent,
    TabelaPrecoComponent,      
    ProdutoComponent, EstoqueInicialComponent, TesteProdutoComponent,
    
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
    AuthService,
    GrupoService,
    SubgrupoService,
    TiposDeSubgrupoService,
    TabelaPrecoItemService,
    EstoqueService,
    LojaService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
