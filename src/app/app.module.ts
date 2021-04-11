import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavegacaoModule } from './navegacao/navegacao.module';


import { environment } from "../environments/environment";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ContaService } from './conta/service/conta.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from '@angular/fire/auth';

import { CustomFormsModule } from 'ngx-custom-validators'
import { EstabelecimentoService } from './estabelecimento/service/estabelecimento.service';
import { InspecaoModule } from './inspecao/inspecao.module';
import { AuthGuard } from './navegacao/service/auth.guard';
import { ErrorInterceptor } from './services/error.handler.service';
import { SistemaModule } from './sistema/sistema.module';
import { UsuarioModule } from './usuario/usuario.module';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NavegacaoModule,
    InspecaoModule,
    SistemaModule,
    UsuarioModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    CustomFormsModule
  ],
  providers: [ContaService, EstabelecimentoService, AuthGuard, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
