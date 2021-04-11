import { Router } from '@angular/router';
import { ItensSistemaInspecao } from './../models/itens-sistema-inspecao';
import { Component, OnInit } from "@angular/core";
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { ToastrService } from 'ngx-toastr';
import { InspecaoService } from '../services/inspecao.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-itens-inspecao',
    templateUrl: './itens-inspecao.component.html',
    styleUrls: ["./itens-inspecao.component.css"]
  })

export class ItensInspecaoComponent implements OnInit{
    
    errors: any[] = [];
    user: any;
    estabelecimento: string;
    LocalStorage = new LocalStorageUtils();
    itensSistemaInspecao: ItensSistemaInspecao;
    idInspecao: string;
    idSistema: string;
    inspecaoConcluida: boolean;
    data: any;

    constructor(private inspecaoService: InspecaoService, 
                private toastr: ToastrService,
                private route: ActivatedRoute,
                private router: Router) { }

    ngOnInit(): void {
      //this.inspecaoConcluida = true;
        this.user = this.LocalStorage.obterUsuario();
        this.estabelecimento = this.user.estabelecimento;

        this.route.params.subscribe((params) => {
            this.idInspecao = params['id'];
            const data = {
                idSistema: params['idSistema']
              };
            this.inspecaoService.postListarItensInspecao(params['id'], data)
            .subscribe(
              sucesso => { this.processarSucesso(sucesso) },
              falha => { this.processarFalha(falha) }
            );
          });
    }

    buscarItensInspecaoSistema(){
      
    }

    processarSucesso(response: any) {
        this.errors = [];
        if(response.success)
        {
           this.itensSistemaInspecao = response.data[0];
           var concluido = true; 
           this.itensSistemaInspecao.itensInspecao.forEach(item => {
            if(item.valor == "")
               concluido = false
           });
           this.inspecaoConcluida = concluido;
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

      confirmaValor(item: any){
        var item_localizado = this.itensSistemaInspecao.itensInspecao.find(x => x.nome == item.nome);
        
        var idElemento = "id_" + item.nome.replace(/\s/g, '-').toLowerCase();

        if(item.tipoDado == "CHECK")
          item_localizado.valor = (<HTMLSelectElement>document.querySelector('input[name="' + idElemento + '"]:checked')).value;
        else
          item_localizado.valor = (<HTMLSelectElement>document.getElementById(idElemento)).value;

        this.salvaItemInspecao(this.idInspecao, item_localizado.id, item_localizado.valor);
      }

      corrigirValor(item: any){
        this.inspecaoConcluida = false;
        var item_localizado = this.itensSistemaInspecao.itensInspecao.find(x => x.nome == item.nome);
        item_localizado.valor = "";
      }

      voltar(){
        this.router.navigate(['/inspecao/ronda/'+ this.idInspecao]);
      }

      salvaItemInspecao(idInspecao: string, idSistema: string, valor: string){
        this.inspecaoService.postSalvarItemInspecao(idInspecao, {
          idItemSistema: idSistema,
          valor: valor
        }).subscribe(
              sucesso => { 
                           this.data = sucesso.data;
                           this.inspecaoConcluida = this.data.inspecaoConcluida;
                           if(this.inspecaoConcluida)
                              //this.toastr.success('A Inspeção deste Sistema foi concluída!', 'Ok :)');
                              {
                                const toast = this.toastr.success('A Inspeção deste Sistema foi concluída!', 'Ok :D');
                                if (toast) {
                                  toast.onHidden.subscribe(() => {
                                    //this.router.navigate(['/inspecao/ronda/'+ this.idInspecao]);
                                  });
                                }
                              }
                         },
              falha => { this.processarFalha(falha) }
        );
      }

}