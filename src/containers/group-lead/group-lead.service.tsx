import {IGroupLead} from "./group-lead.models";

const getGroupLeadList = async () => {
    const response: Response = await fetch('./data/lideres.json');
    const data: IGroupLead[] = await response.json();
    return data;
};

export {
    getGroupLeadList
}