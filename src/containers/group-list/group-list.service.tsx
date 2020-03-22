import {IGroup} from "./group-list.models";

const getGroupList = async () => {
    const response: Response = await fetch('./data/grupos.json');
    const data: IGroup[] = await response.json();
    return data;
};

export {
    getGroupList
}