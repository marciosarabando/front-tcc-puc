import { NovoSistemaComponent } from './novo/novo.sistema.component';
import { DashSistemaComponent } from './dashboard/dash.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SistemaGuard } from "./services/sistema.guard";
import { SistemaAppComponent } from "./sistema.app.component";
import { SistemaDetalheComponent } from './detalhes/sistema.detalhes.component';

const inspecaoRouterConfig: Routes = [
    {
        path: '', component: SistemaAppComponent,
        children: [
            {path: 'dash', component: DashSistemaComponent },
            {path: 'novo', component: NovoSistemaComponent },
            {path: 'detalhe/:id', component: SistemaDetalheComponent },
        ], canActivate: [SistemaGuard]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(inspecaoRouterConfig)
    ],
    exports: [RouterModule]  
  })

export class SistemaRoutingModule { }