import {IGroupLead} from "./group.models";

const getGroupLeadList = async (): Promise<IGroupLead[]> => {
    const response: Response = await fetch('/data/lideres.json');
    return await response.json();
};

const getLead = async (alias: string): Promise<IGroupLead | undefined> => {
    const leadList: IGroupLead[] = await getGroupLeadList();
    return leadList.find((list: IGroupLead) => list.alias === alias);
};

export {
    getLead,
    getGroupLeadList
}