import { DetalhesInspecaoComponent } from './detalhes-inspecao/detalhes-inpecao.component';

import { RelatorioInspecaoComponent } from './relatorio/relatorio.component';
import { SharedModule } from './../shared.module';
import { RondaComponent } from './ronda/ronda.component';
import { InspecaoRoutingModule } from './inspecao.route';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { InspecaoAppComponent } from './inspecao.app.component';
import { DashboardComponent } from './dashboard/dash.component';
import { InspecaoService } from './services/inspecao.service';
import { InspecaoGuard } from './services/inspecao.guard';
import { ItensInspecaoComponent } from './itens-inspecao/itens-inspecao.component';
import { ReplacePipe } from '../utils/replace.pipe';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { defineLocale } from 'ngx-bootstrap/chronos';
import { deLocale } from 'ngx-bootstrap/locale';
defineLocale('pt-br', deLocale);

@NgModule({
    declarations:[InspecaoAppComponent, RondaComponent, DashboardComponent, ItensInspecaoComponent, ReplacePipe, RelatorioInspecaoComponent, DetalhesInspecaoComponent],
    imports:[
            CommonModule,
            InspecaoRoutingModule,
            SharedModule,
            BsDatepickerModule.forRoot()
        ],
    providers:[InspecaoGuard, InspecaoService]
})
export class InspecaoModule { }
