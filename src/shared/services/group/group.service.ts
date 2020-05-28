import {IGroup, IGroupLead, IGroupResponse} from "./group.models";
import {GroupType} from "../../constants/constants";

async function getGroupLeadList(): Promise<IGroupLead[]> {
    const response: Response = await fetch('/data/lideres.json');
    return await response.json();
}

async function getLead(alias: string): Promise<IGroupLead | undefined> {
    const leadList: IGroupLead[] = await getGroupLeadList();
    return leadList.find((list: IGroupLead) => list.alias === alias);
}

async function getGroupList(): Promise<IGroup[]> {
    const response: Response = await fetch('./data/grupos.json');
    const data: IGroupResponse[] = await response.json();
    return buildGroupList(data);
}

function buildGroupList(list: IGroupResponse[]): IGroup[] {
    return list.map(item => buildGroupItem(item));
}

function buildGroupItem(item: IGroupResponse): IGroup {
    return ({
        name: item.name,
        groupName: GroupType[item.groupTypeId],
        address: item.address
    });
}

export {
    getLead,
    getGroupLeadList,
    getGroupList
}
