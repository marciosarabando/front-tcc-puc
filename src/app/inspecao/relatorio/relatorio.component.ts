import { UsuariosRelatorio } from './../models/usuarios-relatorio';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { LocalStorageUtils } from "src/app/utils/localstorage";
import { Chart } from 'chart.js'
import { InspecaoService } from "../services/inspecao.service";
import { ToastrService } from "ngx-toastr";
import { RelatorioInspecao } from "../models/relatorio-inspecao";
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { Router } from '@angular/router';

@Component({
    selector: 'app-relatorio-inspecao',
    templateUrl: './relatorio.component.html',
    styleUrls: ["./relatorio.component.css"]
  })

  export class RelatorioInspecaoComponent implements OnInit, AfterViewInit{
    
    estabelecimento: string;
    LocalStorage = new LocalStorageUtils();
    user: any;
    errors: any[] = [];
    dados: RelatorioInspecao[] = [];
    usuarios: UsuariosRelatorio[] = [];
    dataInicial = new Date();
    opcaoFiltro: any = 1;
    locale = "en";
    anos: any[] = [];
    meses: string[] = ["TODOS MESES", "JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"];
    dadosMeses: number[] = [];
    qtdInspecaoUsuario: number[] = [];
    grafico1: any;
    grafico2: any;
    qtdInpecoesRelatorio: number;

    @ViewChild("meuCanvas", {static: true}) elemento: ElementRef;
    @ViewChild("meuCanvas2", {static: true}) elemento2: ElementRef;

    constructor(private inspecaoService: InspecaoService, 
      private toastr: ToastrService,
      private localeService: BsLocaleService,
      private router: Router) {}
  
    ngAfterViewInit(): void {
      this.buscarRelatorioAno();
    }

    ngOnInit(): void {     
      this.carregaAnos();
      this.carregaUsuarios();
      this.instanciarGraficos();
      this.localeService.use(this.locale);
      this.user = this.LocalStorage.obterUsuario();
      this.estabelecimento = this.user.estabelecimento;
    }

    instanciarGraficos(){
      
    }

    atualizaDadosGrafico(){
      this.dadosMeses = [];
      this.qtdInspecaoUsuario = [];

      this.qtdInpecoesRelatorio = this.dados.length;

      if(this.grafico1 != null)
        this.grafico1.destroy();
      
      if(this.grafico2 != null)
        this.grafico2.destroy();

      var jan = 0;
      var fev = 0;
      var mar = 0;
      var abr = 0;
      var mai = 0;
      var jun = 0;
      var jul = 0;
      var ago = 0;
      var set = 0;
      var out = 0;
      var nov = 0;
      var dez = 0;

      this.dados.forEach(element => { if(moment(element.dataHoraInicio).format("MM") == "01") jan++ });
      this.dadosMeses.push(jan);
      
      this.dados.forEach(element => { if(moment(element.dataHoraInicio).format("MM") == "02") fev++ });
      this.dadosMeses.push(fev);

      this.dados.forEach(element => { if(moment(element.dataHoraInicio).format("MM") == "03") mar++ });
      this.dadosMeses.push(mar);

      this.dados.forEach(element => { if(moment(element.dataHoraInicio).format("MM") == "04") abr++ });
      this.dadosMeses.push(abr);

      this.dados.forEach(element => { if(moment(element.dataHoraInicio).format("MM") == "05") mai++ });
      this.dadosMeses.push(mai);

      this.dados.forEach(element => { if(moment(element.dataHoraInicio).format("MM") == "06") jun++ });
      this.dadosMeses.push(jun);

      this.dados.forEach(element => { if(moment(element.dataHoraInicio).format("MM") == "07") jul++ });
      this.dadosMeses.push(jul);

      this.dados.forEach(element => { if(moment(element.dataHoraInicio).format("MM") == "08") ago++ });
      this.dadosMeses.push(ago);

      this.dados.forEach(element => { if(moment(element.dataHoraInicio).format("MM") == "09") set++ });
      this.dadosMeses.push(set);

      this.dados.forEach(element => { if(moment(element.dataHoraInicio).format("MM") == "10") out++ });
      this.dadosMeses.push(out);

      this.dados.forEach(element => { if(moment(element.dataHoraInicio).format("MM") == "11") nov++ });
      this.dadosMeses.push(nov);

      this.dados.forEach(element => { if(moment(element.dataHoraInicio).format("MM") == "12") dez++ });
      this.dadosMeses.push(dez);
     
      const usuariosDistinct = [... new Set(this.dados.map(item => item.usuario))].sort();
      
      usuariosDistinct.forEach(e => { 
        var qtd = this.dados.map(d => d.usuario).filter(x => x == e).length;
        this.qtdInspecaoUsuario.push(qtd);
      });
      
      this.grafico1 = new Chart(this.elemento.nativeElement, {
        type: 'line',
        data: {
          labels: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
          datasets: [
            {
              label: "Inspeções Realizadas",
              data: this.dadosMeses,
              borderColor: '#00AEFF',
              fill: false
            }
          ]
        },
        options: {
          scales: {
              yAxes: [{
                  stacked: true
              }]
          }
        }
      });
      
      this.grafico2 = new Chart(this.elemento2.nativeElement, {
        type: 'bar',
        data: {
          labels: usuariosDistinct,
          datasets: [
            {
              label: "Inspeções por Usuário",
              data: this.qtdInspecaoUsuario,
              borderColor: '#00AEFF',
              fill: false
            }
          ]
        },
        options: {
          scales: {
              yAxes: [{
                  stacked: true
              }]
          }
        }
      });
    }

    obterRelatorio(inicio: string, fim: string){
      this.inspecaoService
      .ObtemRelatorioInspecaoPeriodo(inicio,fim)
      .subscribe(
        sucesso => { this.processarSucesso(sucesso) },
        falha => { this.processarFalha(falha)}
      );
    }

    abrirDetalhes(idInspecao: string){
      this.router.navigate(['/inspecao/relatorio/'+ idInspecao]);
    }

    processarSucesso(response: any) {
      this.errors = [];
      this.dados = response;
      this.atualizaDadosGrafico();
    }

    processarFalha(fail: any) {
      this.errors = fail.error.errors;
      this.toastr.error('Ocorreu um erro!', 'Opa :(');
    }

    mudarOpcaoFiltro(){
      var opcao = (<HTMLSelectElement>document.getElementById("cmb_opcao_filtro")).value;
      this.opcaoFiltro = opcao;
    }

    buscarRelatorioPeriodo(){
      var dataInicio = (<HTMLSelectElement>document.getElementById("txt_data_inicio")).value;
      var dataFim = (<HTMLSelectElement>document.getElementById("txt_data_fim")).value;

      var inicio = moment(dataInicio, "DD-MM-YYYY");
      var fim = moment(dataFim, "DD-MM-YYYY");

      if(!inicio.isValid() || !fim.isValid())
      {
        alert('O campo Data Início e Data Fim devem ser preenchido com uma data válida no formato DD/MM/AAAA');
        return;
      }

      if(fim.isBefore(inicio))
      {
        alert('A Data Fim deve ser maior do que a Data Inicio')
        return;
      }

      this.obterRelatorio(inicio.format('YYYY-MM-DD 00:00:01'), fim.format('YYYY-MM-DD 23:59:59'));
    }

    carregaAnos(){
      this.inspecaoService
      .ObtemAnosDisponiveisRelatorio()
      .subscribe(
        sucesso => { this.processaCarregaAnos(sucesso) },
        falha => { this.processarFalha(falha)}
      );    
    }

    carregaUsuarios(){
      this.inspecaoService
      .ObtemUsuariosDisponiveisRelatorio()
      .subscribe(
        sucesso => { this.processaCarregaUsuarios(sucesso) },
        falha => { this.processarFalha(falha)}
      );
    }

    processaCarregaAnos(response: any){
      this.anos = response;
      this.anos = this.anos.sort((n1,n2) => n2 - n1);
    }

    processaCarregaUsuarios(response: any){
      this.usuarios = response;
    }

    buscarRelatorioAno(){
      var ano = (<HTMLSelectElement>document.getElementById("cmb_filtro_ano")).value;
      var inicio = moment("01/01/"+ano, "DD-MM-YYYY");
      var fim = moment("31/12/"+ano, "DD-MM-YYYY");
      
      this.obterRelatorio(inicio.format('YYYY-MM-DD 00:00:01'), fim.format('YYYY-MM-DD 23:59:59'));
      //console.log(ano);
    }

    buscarRelatorioMes(){
      var ano = (<HTMLSelectElement>document.getElementById("cmb_filtro_ano")).value;
      var mes = (<HTMLSelectElement>document.getElementById("cmb_filtro_mes")).value;
      
      if(mes == "0")
      {
        var inicio = moment("01/01/"+ano, "DD-MM-YYYY");
        var fim = moment("31/12/"+ano, "DD-MM-YYYY");
      }
      else{
        var ultimoDiaMes = moment(mes + "/2021", "MM-YYYY").endOf("month").format('DD');
        var inicio = moment("01/"+ mes +"/"+ano, "DD-MM-YYYY");
        var fim = moment(ultimoDiaMes + "/"+ mes +"/"+ano, "DD-MM-YYYY");
      }

      this.obterRelatorio(inicio.format('YYYY-MM-DD 00:00:01'), fim.format('YYYY-MM-DD 23:59:59'));      
    }

    buscarRelatorioUsuario(){
      
      var idUsuario = (<HTMLSelectElement>document.getElementById("cmb_filtro_usuario")).value;

      this.inspecaoService
      .ObtemRelatorioInspecaoPorUsuario(idUsuario)
      .subscribe(
        sucesso => { this.processarSucesso(sucesso) },
        falha => { this.processarFalha(falha)}
      );
    }

  }