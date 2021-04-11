import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { GenericResponse } from "src/app/models/genericResponse";
import { BaseService } from "src/app/services/base.service";


@Injectable()
export class ContaService extends BaseService {
    
    constructor(private http: HttpClient) { super() }

    public postLogin() : Observable<GenericResponse> {
        return this.http
        .post(this.UrlServiceV1 + "auth/login", null, this.ObterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
    }

    public postRegistraUsuario(data) : Observable<GenericResponse> {
        return this.http
        .post(this.UrlServiceV1 + "auth/cadastro-inicial", data, this.ObterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
    }

}