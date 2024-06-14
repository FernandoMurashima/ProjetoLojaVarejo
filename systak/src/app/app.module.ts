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

@NgModule({
  declarations: [
    AppComponent,
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
    UserComponent
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
