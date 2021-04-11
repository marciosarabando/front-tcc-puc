import { SistemaService } from './../services/sistema.service';
import { UnidadeMedidaService } from './../../comuns-services/unidade-medida/unidade-medida.service';
import { Component, OnInit } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { ItemSistema, SistemaNovo } from '../models/sistema.novo';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sistema-novo',
    templateUrl: './novo.sistema.component.html',
    styleUrls: ["./novo.sistema.component.css"]
  })


  export class NovoSistemaComponent implements OnInit{
    
    count = 1;
    titulo: string = "CADASTRO DE SISTEMA";
    nomeIcone: string = "cog"
    itensInspecao = [this.count];
    errors: any[] = [];
    unidadeMedida: any[] = [];
    itens: ItemSistema[];
    sistema: SistemaNovo;
    displayMessage: any;
    
    constructor(private unidadeMedidaService: UnidadeMedidaService,
                private toastr: ToastrService,
                private sistemaService: SistemaService,
                private router: Router) {    
    }

    ngOnInit(): void {
      
      this.unidadeMedidaService.obterUnidadesMedidas()
      .subscribe(
        sucesso => { this.processarSucesso(sucesso) },
        falha => { this.processarFalha(falha) }
      );
    }
    processarSucesso(response: any) {
      this.errors = [];
      this.unidadeMedida = response;
    }

    processarFalha(fail: any) {
      this.errors = fail.error.errors;
      this.toastr.error('Ocorreu um erro!', 'Opa :(');
    }

    novoItem(){
      this.count++;
      this.itensInspecao.push(this.count);
      //console.log(this.itensInspecao)
    }

    removerItem(item: any){
      //console.log(item)
      const index = this.itensInspecao.indexOf(item);
      this.itensInspecao.splice(index, 1);
    }

    salvar(){
      if(this.validarCampos())
      {
        var sistema = new SistemaNovo();
        sistema.nome = (<HTMLSelectElement>document.getElementById("nome")).value.toUpperCase();
        sistema.descricao = (<HTMLSelectElement>document.getElementById("descricao")).value;
      
        this.itensInspecao.forEach(element => {
          var nomeItem = (<HTMLSelectElement>document.getElementById("nome_item_"+element)).value.toUpperCase();
          var descricaoItem = (<HTMLSelectElement>document.getElementById("descricao_item_"+element)).value;
          var unidadeMedidaItem = (<HTMLSelectElement>document.getElementById("cmb_item_"+element)).value;
          
          var itemSistema = new ItemSistema();
          itemSistema.nome = nomeItem;
          itemSistema.descricao = descricaoItem;
          itemSistema.idUnidadeMedida = unidadeMedidaItem;
          itemSistema.numeroOrdem = element;

          sistema.itensSistema.push(itemSistema);

        });

        this.sistemaService.postCriarSistemaItens(sistema)
        .subscribe(
          sucesso => { 
            if(sucesso.success){
              this.toastr.success("Incluído", "Sistema incluído com sucesso");
              this.router.navigate(['/sistema/dash']);
            }
            else{
              this.toastr.error(":(",sucesso.menssage);
            }
          },
          falha => { this.processarFalha(falha) }
        )
      }
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

       this.itensInspecao.forEach(element => {
        var nomeItem = (<HTMLSelectElement>document.getElementById("nome_item_"+element)).value;
        var descricaoItem = (<HTMLSelectElement>document.getElementById("descricao_item_"+element)).value;
        var unidadeMedidaItem = (<HTMLSelectElement>document.getElementById("cmb_item_"+element)).value;

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
       });

       return valido;
    }
  }