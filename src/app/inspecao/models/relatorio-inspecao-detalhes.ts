export interface RelatorioInspecaoDetalhes{
    idInspecao: string,
    dataHoraInicio: Date,
    dataHoraFim: Date,
    status: string,
    turno: string,
    observacao: string,
    usuario: string,
    sistemaInspecaoResponse: SistemaInspecaoResponse[]
}

export interface SistemaInspecaoResponse
{
    idSistema: string,
    nomeSistema: string,
    itensInspecao: ItensInspecao[]
}

export interface ItensInspecao{
    dataHora: Date,
    nome: string,
    descricao: string,
    unidadeMedida: string,
    valor: string
}