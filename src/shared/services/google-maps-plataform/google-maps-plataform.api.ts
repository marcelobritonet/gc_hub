import {
    IDistanceMatrix,
    IDistanceMatrixParametres,
    IDistanceMatrixParametresRequest,
    IDistanceMatrixResponse
} from "./google-maps-plataform.models";
import {GOOGLE_MAPS_PLATAFORM_API_KEY, PROXY_URL} from "./google-maps-plataform.constants";
import {cleanEmptyPropetiesFromObjects, serialize} from "../util/util.service";
import {buildDistanceList} from "./google-maps-plataform.service";
import {IGroup} from "../group/group.models";
import {getGroupList} from "../group/group.service";

//https://developers.google.com/maps/documentation/distance-matrix/intro?hl=pt-br
async function getDistanceMatrix(distanceParams: IDistanceMatrixParametres): Promise<IDistanceMatrix[]> {
    const params:IDistanceMatrixParametres = cleanEmptyPropetiesFromObjects(distanceParams)
    const address: string[] = await getDestinationAddress();
    const destinations: string = buildUrlDestinationParams(address);
    const origins: string = buildUrlOriginsParams(params);
    const queryString: string = buildUrlQueryString(params, GOOGLE_MAPS_PLATAFORM_API_KEY);
    const url: string = `${PROXY_URL}https://maps.googleapis.com/maps/api/distancematrix/json?${queryString}${origins}${destinations}`;
    return await fetchDistanceMatrix(url, address);
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

async function fetchDistanceMatrix(url: string, destinations: string[]): Promise<IDistanceMatrix[]> {
    const response: Response = await fetch(url);
    const data: IDistanceMatrixResponse = await response.json();
    return buildDistanceList(data, destinations);
}

export {
    getDistanceMatrix
}
