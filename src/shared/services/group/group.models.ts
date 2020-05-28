export interface IGroupLead {
    nome: string;
    telefone: string;
    alias: string;
}

export interface IGroup {
    name: string;
    groupName: string;
    address: string;
}

export interface IGroupResponse {
    name: string;
    groupTypeId: number;
    address: string;
}