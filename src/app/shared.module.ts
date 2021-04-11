import { TitlePageComponent } from './comuns-components/title-page/title-page.component';
import { NgModule } from '@angular/core';
import { UnidadeMedidaService } from './comuns-services/unidade-medida/unidade-medida.service';

@NgModule({
declarations: [
  TitlePageComponent,
],
exports: [
    TitlePageComponent,
],
providers: [
    UnidadeMedidaService
]
})
export class SharedModule { }