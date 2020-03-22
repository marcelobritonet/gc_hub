export interface IGroupeLead {
    nome: string;
    telefone: string;
}

const getGroupLeadList = async () => {
    const response: Response = await fetch('./data/lideres.json');
    const data: IGroupeLead[] = await response.json();
    return data;
};

export {
    getGroupLeadList
}