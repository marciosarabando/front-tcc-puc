import { Component, Input, OnInit } from "@angular/core";
import { LocalStorageUtils } from "src/app/utils/localstorage";

@Component({
    selector: 'title-page',
    templateUrl: './title-page.component.html'
  })
  
  export class TitlePageComponent implements OnInit {
    @Input()
    titulo: string;
    icone: string = "fas fa-";

    @Input()
    nomeIcone: string = "clock";
    
    user: any;
    estabelecimento: string;
    LocalStorage = new LocalStorageUtils();

    ngOnInit(): void {
      this.user = this.LocalStorage.obterUsuario();
      this.estabelecimento = this.user.estabelecimento;
    }   

    
}
  