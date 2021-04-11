import { ContaService } from './conta/service/conta.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageUtils } from './utils/localstorage';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit{
  title = 'tcc-inspec';
  LocalStorage = new LocalStorageUtils();
  errors: any[] = [];
  
  constructor(private ofAuth: AngularFireAuth,
              private router: Router,
              private contaService: ContaService,
              private toastr: ToastrService) {  }

  ngOnInit(): void {
    this.ofAuth.onAuthStateChanged((dataFirebase) => {
      if (dataFirebase) {
        const user = {
          idFirebase: dataFirebase.uid,
          email: dataFirebase.email,
        };

        this.ofAuth.idToken.subscribe((token) => {
          if (token != null) {
            var userLocalApp = this.LocalStorage.obterUsuario();
            try {
              var possuiUserLocalStoage = userLocalApp.nome;
              console.log(possuiUserLocalStoage);
            }
            catch(e){
              this.LocalStorage.salvarTokenUsuario(token);
              this.autenticarAPI(user);
            }
          }
        });
      }
    });
  }

  autenticarAPI(user) {
    this.contaService.postLogin().subscribe(
          sucesso => { this.processarSucesso(sucesso, user) },
          falha => { this.processarFalha(falha) }
    );
  }

  processarSucesso(response: any, user: any) {
    if (!response.success) {
        this.LocalStorage.salvarUsuario(user);
        this.router.navigate(['/conta/completar-cadastro/']);
      } else {
        this.LocalStorage.salvarUsuario(response.data);
        this.router.navigate(["home"]);
      }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Erro:' + this.errors, 'Opa :(');
  }

}
