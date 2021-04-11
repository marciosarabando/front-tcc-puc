import { SistemaService } from './../services/sistema.service';
import { Component, OnInit } from "@angular/core";
import { ItemSistemaDetalhe, SistemaDetalhe } from '../models/sistema.detalhe';
import { ActivatedRoute } from '@angular/router';
import { UnidadeMedidaService } from 'src/app/comuns-services/unidade-medida/unidade-medida.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-sistema-detalhe',
    templateUrl: './sistema.detalhes.component.html',
    styleUrls: ["./sistema.detalhes.component.css"]
  })
  
 export class SistemaDetalheComponent implements OnInit{

   titulo: string = "DETALHES DE SISTEMA";
   nomeIcone: string = "cogs";
   count = 1;
   itensInspecao = [this.count];
   unidadeMedida: any[] = [];
   sistemaDetalhes: SistemaDetalhe;
   errors: any[] = [];

   constructor(private sistemaService: SistemaService,
               private route: ActivatedRoute,
               private toastr: ToastrService,
               private unidadeMedidaService: UnidadeMedidaService) {
      
   }
    
    ngOnInit(): void {
        this.route.params.subscribe((params) => {
         this.sistemaService.obterDetalhesSistemas(params['id'])
         .subscribe(
            sucesso => { this.processarSucessoDetalhesSistemas(sucesso) },
            falha => {}
         );
        });
      
        this.unidadeMedidaService.obterUnidadesMedidas()
        .subscribe(
          sucesso => { this.processarSucessoUnidadeMedida(sucesso) },
          falha => { this.processarFalha(falha) }
        );
    }

    processarSucessoDetalhesSistemas(response: any) {
      this.sistemaDetalhes = response.data;
    }

    processarSucessoUnidadeMedida(response: any) {
      this.unidadeMedida = response;
    }

    processarSucessoAtualizarSistema(response: any) {
      if(response.success)
      {
        this.toastr.success(":)", "Sistema alterado com sucesso");
      }else
      {
        this.toastr.error(":(",response.menssage);
      }
    }

    salvar(){
      if(this.validarCampos())
      {
        this.sistemaDetalhes.nome = (<HTMLSelectElement>document.getElementById("nome")).value.toUpperCase();
        this.sistemaDetalhes.descricao = (<HTMLSelectElement>document.getElementById("descricao")).value;
        
        this.sistemaDetalhes.itensSistema.forEach(element => {
          element.nome = (<HTMLSelectElement>document.getElementById("nome_item_"+element.id)).value;
          element.descricao = (<HTMLSelectElement>document.getElementById("descricao_item_"+element.id)).value;
          element.idUnidadeMedida = (<HTMLSelectElement>document.getElementById("cmb_item_"+element.id)).value;
          element.numeroOrdem = (<HTMLSelectElement>document.getElementById("ordem_item_"+element.id)).value;
        });

        this.sistemaService.atualizarSistema(this.sistemaDetalhes)
          .subscribe(
            sucesso => { this.processarSucessoAtualizarSistema(sucesso) },
            falha => { this.processarFalha(falha) }
          );
      }
    }

    novoItem(){
      
      //this.itensInspecao.push(this.count);
      var item = new ItemSistemaDetalhe();
      item.id = this.count.toString();
      item.ativo = true;
      this.sistemaDetalhes.itensSistema.push(item);
      this.count++;
    }
    
    ativaDesativaItem(id: any){
      var item = this.sistemaDetalhes.itensSistema.find(x => x.id == id);
      item.ativo = !item.ativo;
    }

    ativaDesativaSistema(){
      this.sistemaDetalhes.ativo = !this.sistemaDetalhes.ativo;
    }

    processarFalha(fail: any) {
      this.errors = fail.error.errors;
      this.toastr.error('Ocorreu um erro!', 'Opa :(');
    }

    validarCampos()
    {
      var valido = true;
      var nome = (<HTMLSelectElement>document.getElementById("nome")).value;
      var descricao = (<HTMLSelectElement>document.getElementById("descricao")).value;

       if(nome == "")
       {
          alert('Preencher o campo nome');
          return false;
       }else if (descricao == "")
       {
          alert('Preencher o campo descricao');
          return false;
       }

       this.sistemaDetalhes.itensSistema.forEach(element => {
        var nomeItem = (<HTMLSelectElement>document.getElementById("nome_item_"+element.id)).value;
        var descricaoItem = (<HTMLSelectElement>document.getElementById("descricao_item_"+element.id)).value;
        var unidadeMedidaItem = (<HTMLSelectElement>document.getElementById("cmb_item_"+element.id)).value;
        var numeroOrdem = (<HTMLSelectElement>document.getElementById("ordem_item_"+element.id)).value;

        if(nomeItem == ""){
            alert('Preencher o campo nome do item');
            valido = false;
        }
        else if (descricaoItem == ""){
            alert('Preencher o campo descricao do item');
            valido = false;
        }
        else if (unidadeMedidaItem == "0"){
          alert('Selecione uma unidade de medida para o item');
          valido = false;
        }
        else if (numeroOrdem == ""){
          alert('Preencher o campo número de ordem do item');
          valido = false;
        }
       });

       return valido;
    }
     
 }