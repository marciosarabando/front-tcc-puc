import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashUsuarioComponent } from "./dashboard/dash.usuario.component";
import { UsuarioDetalhesComponent } from "./detalhes/usuario.detalhes.component";
import { UsuarioGuard } from "./services/usuario.guard";
import { UsuarioAppComponent } from "./usuario.app.component";

const usuarioRouterConfig: Routes = [
    {
        path: '', component: UsuarioAppComponent,
        children: [
            {path: 'dash', component: DashUsuarioComponent },
            {path: 'detalhe/:id', component: UsuarioDetalhesComponent },
        ], canActivate: [UsuarioGuard]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(usuarioRouterConfig)
    ],
    exports: [RouterModule]  
  })

export class UsuarioRoutingModule { }