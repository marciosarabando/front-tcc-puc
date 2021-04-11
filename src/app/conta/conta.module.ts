import { ContaAppComponent } from './conta.app.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ContaRoutingModule } from './conta.route';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComplementoCadastroComponent } from './complemento-cadastro/complemento-cadastro.component';

@NgModule({
    declarations:[CadastroComponent, LoginComponent, ContaAppComponent, ComplementoCadastroComponent],
    imports: [
        CommonModule,
        ContaRoutingModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: []
})

export class ContaModule { }