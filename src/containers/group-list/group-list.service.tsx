import {IGroup, IGroupResponse} from "./group-list.models";
import {GroupType} from "../../shared/constants/constants";

const getGroupList = async (): Promise<IGroup[]>  => {
    const response: Response = await fetch('./data/grupos.json');
    const data: IGroupResponse[] = await response.json();
    return buildGroupList(data);
};

const buildGroupList = (list: IGroupResponse[]): IGroup[] =>
    list.map(item => buildGroupItem(item));

const buildGroupItem = (item: IGroupResponse): IGroup => {
    return ({
        name: item.name,
        groupName: GroupType[item.groupTypeId],
        address: item.address
    });
};

export {
    getGroupList
}