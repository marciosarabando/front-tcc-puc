import { environment } from './../../environments/environment';
import { LocalStorageUtils } from '../utils/localstorage';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

//Classe Abstrata de BASE SERVICE para Métodos usados por vários Services
export abstract class BaseService {
    
    public LocalStorage = new LocalStorageUtils();
    protected UrlServiceV1: string = environment.apiUrlV1;
    protected RouterBase: Router;

    protected obterHeaderJson(){
        return {
             headers: new HttpHeaders({
                 'Content-Type': 'application/json'
             })
        }
    }

    protected ObterAuthHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.LocalStorage.obterTokenUsuario()}`
            })
        };
    }

    protected extractData(response: any){
        return response || {};
    }

    protected serviceError(response: Response | any) {
        let customError: string[] = [];
        
        if (response instanceof HttpErrorResponse) {

            if (response.statusText === "Unknown Error") {
                customError.push("Ocorreu um erro desconhecido");
                response.error.errors = customError;
            }
        }
        
        console.error(response);
        return throwError(response);
    }
}