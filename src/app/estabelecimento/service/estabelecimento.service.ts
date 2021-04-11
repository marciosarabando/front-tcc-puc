import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Estabelecimento } from "src/app/estabelecimento/models/estabelecimento";
import { BaseService } from "src/app/services/base.service";

@Injectable()
export class EstabelecimentoService extends BaseService {
    constructor(private http: HttpClient) { super() }

    public obterTodos() : Observable<Estabelecimento[]> {
                return this.http
                .get<Estabelecimento[]>(this.UrlServiceV1 + "estabelecimento/listar-todos", super.ObterAuthHeaderJson())
                .pipe(
                    map(super.extractData),
                    catchError(super.serviceError));
    }
}