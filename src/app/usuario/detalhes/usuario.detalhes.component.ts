import { Claim, Usuario } from './../models/usuario';
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UsuarioService } from '../services/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-usuario-detalhes',
    templateUrl: './usuario.detalhes.component.html',
    styleUrls: ["./usuario.detalhes.component.css"]
  })

  export class UsuarioDetalhesComponent implements OnInit{
    errors: any[] = [];
    titulo: string = "GESTÃO DE ACESSOS";
    nomeIcone: string = "user-shield";
    usuario: Usuario;
    claims: Claim[] = [];

    constructor(private router: Router,
      private route: ActivatedRoute,
      private toastr: ToastrService,
      private usuarioService: UsuarioService
      ) { }

    ngOnInit(): void {
      this.route.params.subscribe((params) => {
        const idUsuario = params['id'];
        this.usuarioService.obterUsuarioEstabelecimento(idUsuario)
        .subscribe(
          sucesso => this.processarSucesso(sucesso),
          falha => { this.processarFalha(falha) }
        );
      });

      this.usuarioService.obterClaims()
      .subscribe(
        sucesso => this.processarSucessoClaims(sucesso),
        falha => { this.processarFalha(falha) }
      )
    }

    processarSucessoClaims(response: any){
      this.errors = [];
      this.claims = response;
    }
    

    processarSucesso(response: any) {
      this.errors = [];
      this.usuario = response;
    }
  
    processarFalha(fail: any) {
      this.errors = fail.error.errors;
      this.toastr.error('Ocorreu um erro!', 'Opa :(');
    }

    salvar(){
      const data = {
        idUsuario: this.usuario.id,
        perfil: this.usuario.claims[0].valor,
        ativo: this.usuario.ativo
      };

      this.usuarioService.alterarUsuario(data).subscribe(
        sucesso => this.processarSucessoAlterarUsuario(sucesso),
        falha => { this.processarFalha(falha) }
      )
    }

    processarSucessoAlterarUsuario(response: any){
      if(response.success)
      {
        this.toastr.success(":)", "Usuario alterado com sucesso");
      }else
      {
        this.toastr.error(":(",response.menssage);
      }
    }

    voltar(){
      this.router.navigate(['/usuario/dash']);
    }

    ativaDesativaUsuario(){
      this.usuario.ativo = !this.usuario.ativo;
    }

    alteraPerfil(){
      var claim = (<HTMLSelectElement>document.getElementById("cmb_perfil")).value;
      this.usuario.claims[0].valor = claim;
    }
  }