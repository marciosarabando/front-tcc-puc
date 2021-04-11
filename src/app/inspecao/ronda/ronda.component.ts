import { Router } from '@angular/router';

import { SistemasInspecao } from './../models/sistemas-inspecao';
import { Component, OnInit } from "@angular/core";
import { InspecaoService } from "../services/inspecao.service";
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { GenericResponse } from 'src/app/models/genericResponse';
import { AbstractFormGroupDirective } from '@angular/forms';

@Component({
    selector: 'app-ronda',
    templateUrl: './ronda.component.html',
    styleUrls: ["./ronda.component.css"]
  })
  
  export class RondaComponent implements OnInit{
    
    nomeIcone: string = "clipboard-check"
    errors: any[] = [];
    idInspecao: string;
    titulo: string;
    inspecaoConcluida: boolean;
    sistemasInspecao: SistemasInspecao[];
    genericResponse: GenericResponse;

    constructor(private inspecaoService: InspecaoService, 
                private toastr: ToastrService,
                private route: ActivatedRoute,
                private router: Router) { }

    ngOnInit(): void {
      this.titulo = "RONDA DE INSPEÇÃO";

      this.route.params.subscribe((params) => {
        this.idInspecao = params['id'];
        this.inspecaoService.obterListaSistemasRondaPorIdInspecao(params['id'])
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );
      });
    }

    iniciarInspecao(idSistema: string){
        this.router.navigate(['/inspecao/ronda/'+ this.idInspecao + '/sistema/' + idSistema]);
    }

    processarSucesso(response: any) {
      this.errors = [];
      if(response.success)
      {
         this.sistemasInspecao = response.data;
         this.verificaInspecaoConcluida();
      }
      else
      {
        console.log(response);
        this.toastr.error(response.menssage, 'Opa :( ');  
      }
      
    }

    processarFalha(fail: any) {
      this.errors = fail.error.errors;
      this.toastr.error('Ocorreu um erro!', 'Opa :(');
    }

    verificaInspecaoConcluida(){
      if(this.sistemasInspecao.find(x => x.status != "Concluída"))
      {
        this.inspecaoConcluida = false;
      }
      else
      {
        this.inspecaoConcluida = true;
      }
    }

    finalizarInspecao(){
      var observacao = (<HTMLSelectElement>document.getElementById("txt_obs")).value.toUpperCase();
      //console.log(observacao);
      const data = {
        observacao: observacao
      }
      this.inspecaoService.postFinalizarInspecao(this.idInspecao, data)
      .subscribe(
        sucesso => { this.processarFinalizacaoSucesso(sucesso) },
        falha => { this.processarFalha(falha)}
      );
    }

    processarFinalizacaoSucesso(response: any) {
      this.errors = [];
      if(response.success)
      {
        this.toastr.success("Ronda de Inspeção Finalizada", "Ok");
        this.router.navigate(['/inspecao/dash']);
      }
      else
      {
        this.toastr.error(response.menssage, 'Opa :( ');  
      }
    }
    
  }
  