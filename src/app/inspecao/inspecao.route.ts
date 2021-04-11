import { DetalhesInspecaoComponent } from './detalhes-inspecao/detalhes-inpecao.component';
import { RelatorioInspecaoComponent } from './relatorio/relatorio.component';
import { ItensInspecaoComponent } from './itens-inspecao/itens-inspecao.component';
import { DashboardComponent } from './dashboard/dash.component';
import { RondaComponent } from './ronda/ronda.component';
import { InspecaoAppComponent } from './inspecao.app.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InspecaoGuard } from './services/inspecao.guard';


const inspecaoRouterConfig: Routes = [
    {
        path: '', component: InspecaoAppComponent,
        children: [
            {path: 'ronda/:id', component: RondaComponent },
            {path: 'dash', component: DashboardComponent },
            {path: 'ronda/:id/sistema/:idSistema', component: ItensInspecaoComponent },
            {path: 'relatorio', component: RelatorioInspecaoComponent },
            {path: 'relatorio/:idInspecao', component: DetalhesInspecaoComponent },

        ], canActivate: [InspecaoGuard]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(inspecaoRouterConfig)
    ],
    exports: [RouterModule]  
  })

export class InspecaoRoutingModule { }