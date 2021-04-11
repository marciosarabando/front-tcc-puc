import { InspecaoAndamento } from './../models/inspecao-andamento';
import { formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LocalStorageUtils } from "src/app/utils/localstorage";
import { InspecaoService } from "../services/inspecao.service";

@Component({
    selector: 'app-inspec-dash',
    templateUrl: './dash.component.html',
    styleUrls: ["./dash.component.css"]
  })
  
 export class DashboardComponent implements OnInit{
    
    errors: any[] = [];
    user: any;
    inspecaoAndamento: InspecaoAndamento;
    estabelecimento: string;
    primeiroNome: string;
    LocalStorage = new LocalStorageUtils();

    constructor(private router: Router,
                private inspecaoService: InspecaoService,
                private toastr: ToastrService) { }
    
    ngOnInit(): void {
      this.user = this.LocalStorage.obterUsuario();
      this.primeiroNome = this.user.nome.split(" ")[0];
      this.estabelecimento = this.user.estabelecimento;

      this.inspecaoService.verificaUsuarioPossuiInspecaoAndamento()
        .subscribe(
          sucesso => this.processarRespostaInspecaoAndamento(sucesso),
          falha => { this.processarFalha(falha) }
        );
    }
    
    processarRespostaInspecaoAndamento(response: any)
    {
      this.errors = [];
      if(response.success)
      {
        this.inspecaoAndamento = response.data;
        //console.log(this.inspecaoAndamento);
      }
      else
      {
        console.log(response);
        this.toastr.error(response.menssage, 'Opa :( ');  
      }
    }
    
    iniciarInspecao(){
      this.inspecaoService.postIniciarInspecao()
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );
    }
  
    processarSucesso(response: any) {
      this.errors = [];
      if(response.success)
      {
        var dataHoraInicioInspecao = new Date(response.data.dataHoraInicio);
        this.toastr.success('Ronda iniciada às ' + dataHoraInicioInspecao.toLocaleTimeString() + ' em ' + dataHoraInicioInspecao.toLocaleDateString(), 'INSPEÇÃO');
        this.router.navigate(['/inspecao/ronda/'+ response.data.id]);
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

    AbrirInspecaoAndamento(idInspecao: string){
      //console.log(idInspecao);
      this.router.navigate(['/inspecao/ronda/'+ idInspecao]);
    }

    AbrirRelatorio(){
      this.router.navigate(['/inspecao/relatorio']);
    }
  


}