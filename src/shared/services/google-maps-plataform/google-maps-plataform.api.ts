import {
    IDistanceMatrix,
    IDistanceMatrixParametres,
    IDistanceMatrixParametresRequest,
    IDistanceMatrixResponse
} from "./google-maps-plataform.models";
import {GOOGLE_MAPS_PLATAFORM_API_KEY, PROXY_URL} from "./google-maps-plataform.constants";
import {serialize} from "../util/util.service";
import {buildDistanceList} from "./google-maps-plataform.service";
import {IGroup} from "../group/group.models";
import {getGroupList} from "../group/group.service";

//https://developers.google.com/maps/documentation/distance-matrix/intro?hl=pt-br
async function getDistanceMatrix(params: IDistanceMatrixParametres): Promise<IDistanceMatrix[]> {
    const address: string[] = await getDestinationAddress();
    const destinations = buildUrlDestinationParams(address);
    const origins = buildUrlOriginsParams(params);
    const queryString = buildUrlQueryString(params, GOOGLE_MAPS_PLATAFORM_API_KEY);
    const url: string = `${PROXY_URL}https://maps.googleapis.com/maps/api/distancematrix/json?${queryString}${origins}${destinations}`;
    return await fetchDistanceMatrix(url);
}

async function getDestinationAddress(): Promise<string[]> {
    const groups: IGroup[] = await getGroupList();
    return groups.map(group => group.address);
}

function buildUrlDestinationParams(address: string[]): string {
    const destinationsQueryString = address.join('|').replace(/ /g, '+');
    return `&destinations=${destinationsQueryString}`;
}

function buildUrlOriginsParams(params: IDistanceMatrixParametres): string {
    const originsQueryString = params.origins.join('|').replace(/ /g, '+');
    return `&origins=${originsQueryString}`;
}

function buildUrlQueryString(params: IDistanceMatrixParametres, key: string): string {
    const requestParams: IDistanceMatrixParametresRequest = {
        ...params,
        key
    };
    return serialize(requestParams);
}

async function fetchDistanceMatrix(url: string): Promise<IDistanceMatrix[]> {
    const response: Response = await fetch(url);
    const data: IDistanceMatrixResponse = await response.json();
    return buildDistanceList(data);
}

export {
    getDistanceMatrix
}
