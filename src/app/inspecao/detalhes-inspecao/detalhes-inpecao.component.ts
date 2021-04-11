import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LocalStorageUtils } from "src/app/utils/localstorage";
import { RelatorioInspecaoDetalhes } from "../models/relatorio-inspecao-detalhes";
import { InspecaoService } from "../services/inspecao.service";

@Component({
    selector: 'app-detalhes-inspecao',
    templateUrl: './detalhes-inspecao.component.html',
    styleUrls: ["./detalhes-inspecao.component.css"]
  })

  export class DetalhesInspecaoComponent implements OnInit{
    errors: any[] = [];
    user: any;
    estabelecimento: string;
    LocalStorage = new LocalStorageUtils();
    idInspecao: string;
    dados: RelatorioInspecaoDetalhes;

    constructor(private inspecaoService: InspecaoService,
      private route: ActivatedRoute,
      private toastr: ToastrService,
      private router: Router) { }
    
    ngOnInit(): void {
        this.user = this.LocalStorage.obterUsuario();
        this.estabelecimento = this.user.estabelecimento;

        this.route.params.subscribe((params) => {
          this.idInspecao = params['idInspecao'];
          
          this.inspecaoService.ObtemRelatorioDetalhesInspecao(this.idInspecao)
          .subscribe(
            sucesso => { this.processarSucesso(sucesso) },
            falha => { this.processarFalha(falha) }
          );
        });
        
    }

    processarSucesso(response: any) {
      this.dados = response;
      //console.log(this.dados);
    }

    processarFalha(fail: any) {
      this.errors = fail.error.errors;
      this.toastr.error('Ocorreu um erro!', 'Opa :(');
    }

    voltar(){
      this.router.navigate(['/inspecao/relatorio']);
    }

  }
