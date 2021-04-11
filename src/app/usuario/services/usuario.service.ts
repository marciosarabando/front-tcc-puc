import { GenericResponse } from './../../models/genericResponse';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { BaseService } from "src/app/services/base.service";
import { Claim, Usuario } from "../models/usuario";

@Injectable()
export class UsuarioService extends BaseService {
    
    constructor(private http: HttpClient) { super() }

    public obterUsuariosEstabelecimento(): Observable<Usuario> {
        return this.http
            .get<Usuario>(this.UrlServiceV1 + "auth/obter-usuarios", super.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    public obterUsuarioEstabelecimento(idUsuario: string): Observable<Usuario> {
        return this.http
            .get<Usuario>(this.UrlServiceV1 + "auth/obter-usuario?idUsuario=" + idUsuario, super.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    public obterClaims(): Observable<Claim> {
        return this.http
            .get<Claim>(this.UrlServiceV1 + "claim/obter-claims", super.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    public alterarUsuario(data: any): Observable<GenericResponse> {
        return this.http
            .put<GenericResponse>(this.UrlServiceV1 + "auth/alterar-usuario", data, super.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

}