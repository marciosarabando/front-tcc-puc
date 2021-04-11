import { Component, ElementRef, OnInit, ViewChildren } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { FormBaseComponent } from "src/app/base-components/form-base.component";
import { CustomValidators } from 'ngx-custom-validators';

@Component({
    selector: 'app-cadastro',
    templateUrl: './cadastro.component.html',
    styleUrls: ["./cadastro.component.css"]
  })

  export class CadastroComponent extends FormBaseComponent implements OnInit {

    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
    
    public novaContaForm: FormGroup;

    constructor(private fb: FormBuilder, 
      private ofAuth: AngularFireAuth,
      private toastr: ToastrService,
      private router: Router){
        
      super();
      
      this.validationMessages = {
        email: {
          required: 'Informe o e-mail do usuário.',
          email: 'Email Inválido'
        },
        senha: {
          required: 'Informe a senha de acesso.',
          rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
        },
        confirmaSenha: {
          required: 'Confirme a nova senha de acesso.',
          rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
          equalTo: 'As senhas não conferem'
        }
      };

      super.configurarMensagensValidacaoBase(this.validationMessages);

    }


    ngOnInit(): void {

    let senha = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15])]);
    let senhaConfirm = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15]), CustomValidators.equalTo(senha)]);

      this.novaContaForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        senha: senha,
        confirmaSenha: senhaConfirm,
      });
    }
    
    ngAfterViewInit(): void {
      super.configurarValidacaoFormularioBase(this.formInputElements, this.novaContaForm)
    }

    registrarUsuario(){
      if (this.novaContaForm.dirty && this.novaContaForm.valid) {
        this.ofAuth.createUserWithEmailAndPassword(this.novaContaForm.value.email, this.novaContaForm.value.senha);
      }
    }

  }