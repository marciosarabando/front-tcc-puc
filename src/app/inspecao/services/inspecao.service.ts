import { GenericResponse } from './../../models/genericResponse';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { BaseService } from "src/app/services/base.service";
import { UsuariosRelatorio } from '../models/usuarios-relatorio';
import { RelatorioInspecaoDetalhes } from '../models/relatorio-inspecao-detalhes';

@Injectable()
export class InspecaoService extends BaseService {
    
    constructor(private http: HttpClient) { super() }

    public postIniciarInspecao() : Observable<GenericResponse> {
        return this.http
        .post(this.UrlServiceV1 + "inspecao/iniciar", null, this.ObterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
    }

    public obterListaSistemasRondaPorIdInspecao(id: string): Observable<GenericResponse> {
        return this.http
            .get<GenericResponse>(this.UrlServiceV1 + "inspecao/" + id + "/listar-sistemas/", super.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    public verificaUsuarioPossuiInspecaoAndamento(): Observable<GenericResponse> {
        return this.http
            .get<GenericResponse>(this.UrlServiceV1 + "inspecao/possui-inspecao-andamento/", super.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    public postListarItensInspecao(idSistema: string, data: any): Observable<GenericResponse> {
        return this.http
            .post<GenericResponse>(this.UrlServiceV1 + "inspecao/" + idSistema + "/listar-itens-inspecao", data, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    public postSalvarItemInspecao(idSistema: string, data: any): Observable<GenericResponse> {
        return this.http
            .post<GenericResponse>(this.UrlServiceV1 + "inspecao/" + idSistema + "/salvar-item-inspecao", data, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    public postFinalizarInspecao(idSistema: string, data: any): Observable<GenericResponse>{
        return this.http
            .post<GenericResponse>(this.UrlServiceV1 + "inspecao/" + idSistema + "/finalizar", data, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    public ObtemRelatorioInspecaoPeriodo(inicio: string, fim: string): Observable<GenericResponse> {
        return this.http
            .get<GenericResponse>(this.UrlServiceV1 + "inspecao/relatorio/listar-por-periodo?inicio=" + inicio + "&fim=" + fim, super.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    public ObtemRelatorioInspecaoPorUsuario(idUsuario: string): Observable<GenericResponse> {
        return this.http
            .get<GenericResponse>(this.UrlServiceV1 + "inspecao/relatorio/listar-por-usuario?idUsuario=" + idUsuario, super.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    public ObtemAnosDisponiveisRelatorio(){
        return this.http
            .get(this.UrlServiceV1 + "inspecao/relatorio/listar-anos-disponiveis", super.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    public ObtemUsuariosDisponiveisRelatorio(){
        return this.http
            .get<UsuariosRelatorio>(this.UrlServiceV1 + "inspecao/relatorio/listar-usuarios-disponiveis", super.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    public ObtemRelatorioDetalhesInspecao(idInspecao: string): Observable<RelatorioInspecaoDetalhes> {
        return this.http
            .get<RelatorioInspecaoDetalhes>(this.UrlServiceV1 + "inspecao/relatorio/listar-detalhes-inspecao?idInspecao=" + idInspecao, super.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }
}