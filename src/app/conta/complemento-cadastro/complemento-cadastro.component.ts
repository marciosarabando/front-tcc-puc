import { CadastroInicial } from './../models/cadastro-inicial';
import { EstabelecimentoService } from './../../estabelecimento/service/estabelecimento.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ContaService } from './../service/conta.service';
import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { FormBaseComponent } from 'src/app/base-components/form-base.component';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { Estabelecimento } from 'src/app/estabelecimento/models/estabelecimento';

@Component({
  selector: 'app-complemento-cadastro',
  templateUrl: './complemento-cadastro.component.html'
})
export class ComplementoCadastroComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  errors: any[] = [];
  cadastroinicial = new CadastroInicial();
  estabelecimentos: Estabelecimento[];
  public complementoCadastroForm: FormGroup;
  LocalStorage = new LocalStorageUtils();

  constructor(private fb: FormBuilder, 
              private contaService: ContaService,
              private estabelecimentoService: EstabelecimentoService,
              private router: Router,
              private toastr: ToastrService
              ) { 
    super();
    
    this.validationMessages = {
      nomeCompleto: {
        required: 'Informe seu nome completo.',
      },
      estabelecimentoCNPJ: {
        required: 'Selecione seu local de trabalho.',
      }
    };
    super.configurarMensagensValidacaoBase(this.validationMessages);
    
  }

  ngOnInit(): void {

    this.estabelecimentoService.obterTodos()
      .subscribe(estabelecimentos => this.estabelecimentos = estabelecimentos);

    this.complementoCadastroForm = this.fb.group({
      nomeCompleto: [
        "",
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(60),
          Validators.required,
        ]),
      ],
      estabelecimentoCNPJ: ['', [Validators.required]],
    });
  }

  ngAfterViewInit(): void {

    super.configurarValidacaoFormularioBase(this.formInputElements, this.complementoCadastroForm)
  }

  registrarUsuario(){
    if (this.complementoCadastroForm.dirty && this.complementoCadastroForm.valid) {

      this.cadastroinicial.nome = this.complementoCadastroForm.value.nomeCompleto;
      this.cadastroinicial.cnpjEstabelecimento = this.complementoCadastroForm.value.estabelecimentoCNPJ;

      this.contaService.postRegistraUsuario(this.cadastroinicial)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );
    }
  }

  processarSucesso(response: any) {
    this.errors = [];
    if(response.success)
    {
      this.LocalStorage.salvarUsuario(response.data);
      this.router.navigate(["home"]);
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


}
