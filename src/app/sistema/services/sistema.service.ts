import { SistemaOrdem, SistemasOrdem } from './../models/sistema.ordem';
import { GenericResponse } from './../../models/genericResponse';
import { SistemaDetalhe } from './../models/sistema.detalhe';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { BaseService } from "src/app/services/base.service";
import { SistemaNovo } from "../models/sistema.novo";

@Injectable()
export class SistemaService extends BaseService {
    
    constructor(private http: HttpClient) { super() }

    public obterSistemasEstabelecimento(): Observable<GenericResponse> {
        return this.http
            .get<GenericResponse>(this.UrlServiceV1 + "sistema/listar", super.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    public postCriarSistemaItens(data: SistemaNovo): Observable<GenericResponse> {
        return this.http
            .post<GenericResponse>(this.UrlServiceV1 + "sistema/criar", data, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    public obterDetalhesSistemas(idSistema: string): Observable<GenericResponse> {
        return this.http
            .get<GenericResponse>(this.UrlServiceV1 + "sistema/listar-detalhes?idSistema= " + idSistema, super.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    public atualizarSistema(data: SistemaDetalhe): Observable<GenericResponse>{
        return this.http
            .put<GenericResponse>(this.UrlServiceV1 + "sistema/alterar", data, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    public atualizarOrdemSistema(data: SistemasOrdem): Observable<GenericResponse>{
        return this.http
            .post<GenericResponse>(this.UrlServiceV1 + "sistema/atualizar-ordem", data, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }
}