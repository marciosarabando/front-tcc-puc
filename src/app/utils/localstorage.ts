export class LocalStorageUtils {
  
    public obterTokenUsuario(): string {
      return localStorage.getItem("inspec.token");
    }
  
    public salvarTokenUsuario(token: string) {
      localStorage.setItem("inspec.token", token);
    }
        
    public salvarUsuario(user: any) {
      localStorage.setItem("inspec.user", JSON.stringify(user));
    }
  
    public obterUsuario() {
      return JSON.parse(localStorage.getItem("inspec.user"));
    }

    public limparDadosLocaisUsuario() {
      localStorage.removeItem("inspec.token");
      localStorage.removeItem("inspec.user");
    }
  }
  