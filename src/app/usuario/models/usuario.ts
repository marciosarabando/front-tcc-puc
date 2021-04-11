export interface Usuario {
    id: string,
    email: string,
    nome: string,
    ativo: boolean,
    claims: Claim[]
}

export interface Claim {
    id: string,
    nome: string,
    valor: string
}
