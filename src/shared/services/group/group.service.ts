import {IGroup, IGroupLead, IGroupResponse} from "./group.models";
import {GroupType} from "../../constants/constants";
import SessionStorage from '../session-storage/session-storage.service'

const LEAD_LOCAL_STORAGE_KEY = 'lead_list';
const GROUP_LIST_STORAGE_KEY = 'group_list';

async function getGroupLeadList(): Promise<IGroupLead[]> {
    const storaged = SessionStorage.get(LEAD_LOCAL_STORAGE_KEY);

    if (storaged) {
        return await storaged;
    } else {
        const response: Response = await fetch('/data/lideres.json');
        const data = await response.json();
        SessionStorage.set(LEAD_LOCAL_STORAGE_KEY, data);
        return data;
    }
}

async function getLead(alias: string): Promise<IGroupLead | undefined> {
    const leadList: IGroupLead[] = await getGroupLeadList();
    return leadList.find((list: IGroupLead) => list.alias === alias);
}

async function getGroupList(): Promise<IGroup[]> {
    const storaged = SessionStorage.get(GROUP_LIST_STORAGE_KEY);

    if(storaged) {
        return await storaged;
    } else {
        const response: Response = await fetch('./data/grupos.json');
        const data: IGroupResponse[] = await response.json();
        const leads: IGroupLead[] = await getGroupLeadList();
        const list: IGroup[] = buildGroupList(data, leads);
        SessionStorage.set(GROUP_LIST_STORAGE_KEY, list);
        return list;
    }
}

function buildGroupList(list: IGroupResponse[], leads: IGroupLead[]): IGroup[] {
    return list.map(item => buildGroupItem(item, leads));
}

function buildGroupItem(item: IGroupResponse, allGroupLeads: IGroupLead[]): IGroup {
    // TODO: BUILDAR REUNION
    // TODO: POSSIBIILIDADE DE TER MAIS DE UM ENCONTRO POR GRUPO
    const reducer = (accumulator: IGroupLead[], currentValue: string): IGroupLead[] => {
        const lead: IGroupLead | undefined = allGroupLeads.find((_groupLead: IGroupLead) =>
            _groupLead.alias === currentValue
        )

        return lead
            ? [...accumulator, lead]
            : accumulator
    }

    return {
        name: item.name,
        groupName: GroupType[item.groupTypeId],
        address: item.address,
        groupLeads: item.groupLeads.reduce(reducer, []),
        reunion: 'sexta 20h30',
        complement: item.complement
    };
}

export {
    getLead,
    getGroupLeadList,
    getGroupList
}
