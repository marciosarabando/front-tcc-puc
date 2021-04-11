import { SistemaService } from './../services/sistema.service';
import { Component, OnInit } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { Sistema } from '../models/sistema';
import { Router } from '@angular/router';
import { SistemaOrdem, SistemasOrdem } from '../models/sistema.ordem';
import { createEmitAndSemanticDiagnosticsBuilderProgram } from 'typescript';

@Component({
    selector: 'app-sistema-dash',
    templateUrl: './dash.component.html',
    styleUrls: ["./dash.component.css"]
  })
  
 export class DashSistemaComponent implements OnInit{

  errors: any[] = [];
  sistemas: Sistema[];
  titulo: string = "GESTÃO DE SISTEMAS";
  nomeIcone: string = "cogs"

  constructor(private sistemaService: SistemaService, 
            private toastr: ToastrService,
            private router: Router) {
  }

  ngOnInit(): void {
    this.listarSistemaEstabelecimento();
  }

  processarSucesso(response: any) {
    this.errors = [];
    if(response.success)
    {
      this.sistemas = response.data;
      //console.log(this.sistemas);
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  abrirDetalhes(idSistema: string)
  {
    this.router.navigate(['/sistema/detalhe/' + idSistema]);
  }

  atualizarOrdem(){
    var sistemasOrdem = new SistemasOrdem();
    
    this.sistemas.forEach(element => {
      var sistemaOrdem = new SistemaOrdem();
      
      sistemaOrdem.idSistema = element.id;

      element.numeroOrdem = parseInt((<HTMLSelectElement>document.getElementById("ordem_item_"+element.id)).value);

      sistemaOrdem.numeroOrdem = element.numeroOrdem.toString();  

      sistemasOrdem.sistemasOrdem.push(sistemaOrdem);
    });

    this.sistemaService.atualizarOrdemSistema(sistemasOrdem)
    .subscribe(
      sucesso => { this.listarSistemaEstabelecimento() },
      falha => { this.processarFalha(falha) }
    )
  }

  listarSistemaEstabelecimento(){
    this.sistemaService.obterSistemasEstabelecimento()
    .subscribe(
      sucesso => this.processarSucesso(sucesso),
      falha => { this.processarFalha(falha) }
    );
  }

  gerarCSV(){
    const data = this.sistemas;
    const csvRows = [];

    //get headers
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));

    //loop over the rows
    for (const row of data){
      const values = headers.map(header => {
        const escaped = (''+row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }
    
    var csv = csvRows.join('\n');
    
    this.download(csv);
  }

  download(data){
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'sistemas.xlsx');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

 }