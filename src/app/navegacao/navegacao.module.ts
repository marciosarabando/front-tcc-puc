import { AcessoNegadoComponent } from './acesso-negado/acesso-negado.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from '../navegacao/menu/menu.component'
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuLoginComponent } from './menu-login/menu-login.component';

@NgModule({
    declarations: [
        FooterComponent,
        MenuComponent,
        HomeComponent,
        NotFoundComponent,
        MenuLoginComponent,
        AcessoNegadoComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        NgbModule
    ],
    exports: [
        FooterComponent,
        MenuComponent,
        HomeComponent,
        NotFoundComponent
    ],
    providers: [
    ]
})

export class NavegacaoModule { }