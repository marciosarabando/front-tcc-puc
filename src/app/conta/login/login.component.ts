import {
  Router
} from '@angular/router';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChildren
} from "@angular/core";
import {
  FormBuilder,
  FormControlName,
  FormGroup,
  Validators
} from "@angular/forms";
import {
  FormBaseComponent
} from "src/app/base-components/form-base.component";
import {
  ToastrService
} from 'ngx-toastr';

import {
  AngularFireAuth
} from "@angular/fire/auth";
import firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ["./login.component.css"]
})

export class LoginComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, {
    read: ElementRef
  }) formInputElements: ElementRef[];

  public loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private ofAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router) {

    super();
    this.validationMessages = {
      email: {
        required: 'Informe o e-mail do usuário.',
        email: 'Email Inválido'
      },
      senha: {
        required: 'Informe a senha de acesso.'
      }
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);


  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ["", Validators.required],
    });
  }

  ngAfterViewInit(): void {

    super.configurarValidacaoFormularioBase(this.formInputElements, this.loginForm)
  }

  login() {
    var loginRealizado = false;

    if (this.loginForm.valid) {
      this.ofAuth.signInWithEmailAndPassword(
        this.loginForm.value.email,
        this.loginForm.value.senha
      ).then((resp) => {
        loginRealizado = true;

        let toast = this.toastr.success('Login realizado com sucesso!', 'Sucesso!');
        if (toast) {
          toast.onHidden.subscribe(() => {
            //this.router.navigate(['/fornecedores/listar-todos']);
          });
        }
      }).catch(() => {
        this.toastr.error('Usuário ou Senha inválidos!', 'Erro!');
      });

    };
  }

  loginGoogle() {
    this.ofAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(() => {
        //console.log("Logado com usuário do google");
        this.router.navigate(['/home']);
      });
  }
}