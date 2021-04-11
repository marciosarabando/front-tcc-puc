import { Usuario } from './../models/usuario';
import { UsuarioService } from './../services/usuario.service';
import { Component, OnInit } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'app-usuario-dash',
    templateUrl: './dash.usuario.component.html',
    styleUrls: ["./dash.usuario.component.css"]
  })
  
 export class DashUsuarioComponent implements OnInit{
   
   errors: any[] = [];
   titulo: string = "GESTÃO DE ACESSOS";
   nomeIcone: string = "user-shield";
   usuarios: Usuario[] = [];

   
   constructor(private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private router: Router) { }

    ngOnInit(): void {
      this.usuarioService.obterUsuariosEstabelecimento()
      .subscribe(
        sucesso => this.processarSucesso(sucesso),
        falha => { this.processarFalha(falha) }
      );

    }

    processarSucesso(response: any) {
      this.errors = [];
      this.usuarios = response;
    }
  
    processarFalha(fail: any) {
      this.errors = fail.error.errors;
      this.toastr.error('Ocorreu um erro!', 'Opa :(');
    }

    gerarCSV(){
      const data = this.usuarios;
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
      a.setAttribute('download', 'usuarios.xlsx');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    abrirDetalhes(idUsuario){    
      this.router.navigate(['/usuario/detalhe/' + idUsuario]);
    }
 }