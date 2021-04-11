import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { BaseService } from "src/app/services/base.service";

@Injectable()
export class UnidadeMedidaService extends BaseService {
    
    constructor(private http: HttpClient) { super() }

    public obterUnidadesMedidas(): Observable<Object> {
        return this.http
            .get<Object>(this.UrlServiceV1 + "unidade-medida", super.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }
}