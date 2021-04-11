import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { LocalStorageUtils } from 'src/app/utils/localstorage';

export abstract class BaseGuard {

    private localStorageUtils = new LocalStorageUtils();

    constructor(protected router: Router){}
    
    protected validarClaims(routeAc: ActivatedRouteSnapshot) : boolean {
        
        if(!this.localStorageUtils.obterTokenUsuario()){
            //this.router.navigate(['/conta/login/'], { queryParams: { returnUrl: this.router.url }});
            this.router.navigate(['/conta/login/']);
        }  

        let user = this.localStorageUtils.obterUsuario();

        if(user.nome == null)
        {
            this.router.navigate(['conta/completar-cadastro']);
        }
        /*
        if(this.localStorageUtils.obterTokenUsuario() && !this.localStorageUtils.obterUsuario())
        {
            this.router.navigate(['conta/completar-cadastro']);
        }*/


        let claim: any = routeAc.data[0];

        if (claim !== undefined) {
            let claim = routeAc.data[0]['claim'];

            if (claim) {
                if (!user.claims) {
                    this.navegarAcessoNegado();
                }
                
                let userClaims = user.claims.find(x => x.type === claim.nome);
                
                if(!userClaims){
                    this.navegarAcessoNegado();
                }
                
                let valoresClaim = userClaims.value as string;

                if (!valoresClaim.includes(claim.valor)) {
                    this.navegarAcessoNegado();
                }
            }
        }

        return true;  
    }

    private navegarAcessoNegado() {
        this.router.navigate(['/acesso-negado']);
    }    
}