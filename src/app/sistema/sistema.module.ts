import { SharedModule } from './../shared.module';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DashSistemaComponent } from "./dashboard/dash.component";
import { SistemaGuard } from "./services/sistema.guard";

import { SistemaAppComponent } from "./sistema.app.component";
import { SistemaRoutingModule } from "./sistema.route";
import { SistemaService } from './services/sistema.service';
import { NovoSistemaComponent } from './novo/novo.sistema.component';
import { SistemaDetalheComponent } from './detalhes/sistema.detalhes.component';

@NgModule({
    declarations:[SistemaAppComponent, DashSistemaComponent, NovoSistemaComponent, SistemaDetalheComponent],
    imports:[
            CommonModule,
            SistemaRoutingModule,
            SharedModule
        ],
    providers:[SistemaGuard, SistemaService]
})
export class SistemaModule { }