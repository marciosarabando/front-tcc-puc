export class SistemaDetalhe{
    id: string;
    nome: string;
    descricao: string;
    numeroOrdem: number;
    ativo: boolean
    itensSistema: ItemSistemaDetalhe[] = []
}

export class ItemSistemaDetalhe{
    id: string;
    nome: string;
    descricao: string;
    numeroOrdem: string;
    idUnidadeMedida: string;
    nomeUnidadeMedida: string;
    tipoDado: string;
    ativo: boolean
}