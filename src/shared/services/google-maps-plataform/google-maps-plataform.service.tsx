import {serialize} from "../util/util.service";
import {
    IDistanceMatrixParametres,
    IDistanceMatrixParametresRequest,
    IDistanceMatrixResponse
} from "./google-maps-plataform.models";
import {getGroupList} from "../../../containers/group-list/group-list.service";
import {IGroup} from "../../../containers/group-list/group-list.models";

const GOOGLE_MAPS_PLATAFORM_API_KEY = 'AIzaSyC2IdkXtXRKxKhQVBBw-XyKA_PazKAo1Js';
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

const getDistanceMatrix = async (params: IDistanceMatrixParametres) => {
    const groups: IGroup[] = await getGroupList();
    const address: string[] = groups.map(group => group.endereco);
    const destinations: string = `&destinations=${address.join('|').replace(/ /g, '+')}`;
    const origins: string = `&origins=${params.origins.join('|').replace(/ /g, '+')}`;
    const requestParams: IDistanceMatrixParametresRequest = {
        ...params,
        key: GOOGLE_MAPS_PLATAFORM_API_KEY
    };
    const queryString: string = serialize(requestParams);
    const url: string = `${PROXY_URL}https://maps.googleapis.com/maps/api/distancematrix/json?${queryString}${origins}${destinations}`;
    const response: Response = await fetch(url);
    const data: IDistanceMatrixResponse = await response.json();
    return data;
};

export {
    GOOGLE_MAPS_PLATAFORM_API_KEY,
    getDistanceMatrix
}