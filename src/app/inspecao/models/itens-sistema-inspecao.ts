export interface ItensSistemaInspecao {
    nomeSistema: string;
    itensInspecao: Itens[];
}

export interface Itens {
    id: string;
    nome: string;
    descricao: string;
    unidadeMedida: string;
    tipoDado: string;
    valor: string
}