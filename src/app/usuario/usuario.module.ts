import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared.module";
import { DashUsuarioComponent } from "./dashboard/dash.usuario.component";
import { UsuarioDetalhesComponent } from "./detalhes/usuario.detalhes.component";
import { UsuarioGuard } from "./services/usuario.guard";
import { UsuarioService } from "./services/usuario.service";
import { UsuarioAppComponent } from "./usuario.app.component";
import { UsuarioRoutingModule } from "./usuario.route";

@NgModule({
    declarations:[UsuarioAppComponent, DashUsuarioComponent, UsuarioDetalhesComponent],
    imports:[
            CommonModule,
            UsuarioRoutingModule,
            SharedModule
        ],
    providers:[UsuarioGuard, UsuarioService]
})
export class UsuarioModule { }