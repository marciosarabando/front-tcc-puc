import { Component, OnInit } from '@angular/core';
import { LocalStorageUtils } from 'src/app/utils/localstorage';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
    
    primeiroNome: string;
    perfilAcesso: string;
    user: any;
    estabelecimento: string;
    LocalStorage = new LocalStorageUtils();
    
    ngOnInit(): void {
      this.user = this.LocalStorage.obterUsuario();
      this.estabelecimento = this.user.estabelecimento;

      this.primeiroNome = this.user.nome.split(" ")[0];

      this.user.claims.forEach(element => {
        if(element.nome == "PerfilAcesso")
          this.perfilAcesso = element.valor;
      });

      //console.log(this.perfilAcesso)
    }    
}