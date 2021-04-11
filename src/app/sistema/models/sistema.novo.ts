export class SistemaNovo{
    nome: string;
    descricao: string;
    itensSistema: ItemSistema[] = []
}

export class ItemSistema{
    nome: string;
    descricao: string;
    numeroOrdem: number;
    idUnidadeMedida: string
}