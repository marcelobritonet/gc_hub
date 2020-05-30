export interface IGroupLead {
    nome: string;
    phone: string;
    alias: string;
}

export interface IGroup {
    name: string;
    groupName: string;
    address: string;
    teamLead: IGroupLead[];
    data: string;
    complement: string;
}

export interface IGroupResponse {
    name: string;
    groupTypeId: number;
    groupName: string;
    address: string;
    teamLead: string[];
    data: Data;
    complement: string;
}

interface Data {
    dia: number;
    hora: string;
}
