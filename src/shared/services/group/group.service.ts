import {IGroup, IGroupLead, IGroupResponse} from "./group.models";
import {GroupType} from "../../constants/constants";
import SessionStorage from '../session-storage/session-storage.service'

async function getGroupLeadList(): Promise<IGroupLead[]> {
    const LEAD_LOCAL_STORAGE_KEY = 'lead_list'
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
    const GROUP_LIST_STORAGE_KEY = 'group_list';
    const storaged = SessionStorage.get(GROUP_LIST_STORAGE_KEY);
    if(storaged) {
        return await storaged;
    } else {
        const response: Response = await fetch('./data/grupos.json');
        const data: IGroupResponse[] = await response.json();
        const list = buildGroupList(data);
        SessionStorage.set(GROUP_LIST_STORAGE_KEY, list);
        return list;
    }
}

function buildGroupList(list: IGroupResponse[]): IGroup[] {
    return list.map(item => buildGroupItem(item));
}

function buildGroupItem(item: IGroupResponse): IGroup {
    // TODO: POSSIBIILIDADE DE TER MAIS DE UM ENCONTRO POR GRUPO
    const { name, address, complement } = item;

    return {
        name: name,
        groupName: GroupType[item.groupTypeId],
        address: address,
        teamLead: [{
            nome: 'lider',
            phone: '21 9999 9999',
            alias: 'alilas',
        }],
        data: 'sexta 20h30',
        complement: complement
    };
}

export {
    getLead,
    getGroupLeadList,
    getGroupList
}
