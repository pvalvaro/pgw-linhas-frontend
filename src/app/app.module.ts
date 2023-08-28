import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DetalharVooComponent } from './components/pgw-voo/detalhar-voo/detalhar-voo.component';
import { AdicionarVooComponent } from './components/pgw-voo/adicionar-voo/adicionar-voo.component';
import { ListarVooComponent } from './components/pgw-voo/listar-voo/listar-voo.component';
import { AlterarVooComponent } from './components/pages/alterar-voo/alterar-voo.component';
import { PrecoComponent } from './components/pgw-voo/preco/preco.component';
import { ComprarPassagemComponent } from './components/pages/comprar-passagem/comprar-passagem.component';
import { PassagemResumoComponent } from './components/pages/passagem-resumo/passagem-resumo.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { MenuComponent } from './components/pages/menu/menu.component';
import { AeroportosComponent } from './components/pgw-voo/aeroportos/aeroportos.component';
import { ConsultarPassagemComponent } from './components/passagens/consultar-passagem/consultar-passagem.component';
import { EmitirVoucherComponent } from './components/pages/emitir-voucher/emitir-voucher.component';

@NgModule({
  declarations: [
    AppComponent,
    DetalharVooComponent,
    AdicionarVooComponent,
    ListarVooComponent,
    AlterarVooComponent,
    PrecoComponent,
    ComprarPassagemComponent,
    PassagemResumoComponent,
    HomeComponent,
    LoginComponent,
    MenuComponent,
    AeroportosComponent,
    ConsultarPassagemComponent,
    EmitirVoucherComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
