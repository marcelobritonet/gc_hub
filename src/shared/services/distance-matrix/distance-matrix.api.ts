//https://developers.google.com/maps/documentation/distance-matrix/intro?hl=pt-br
//https://console.developers.google.com/apis/dashboard?project=still-tensor-271919

import {
    IDistanceMatrixParametres,
    IDistanceMatrixParametresRequest,
    IDistanceMatrixResponse
} from "./distance-matrix.models";
import {cleanEmptyPropetiesFromObjects, serialize} from "../util/util.service";

function buildApiUrl(distanceParams: IDistanceMatrixParametres, address: string[]): string {
    const destinations: string = buildUrlDestinationParams(address);
    const origins: string = buildUrlOriginsParams(distanceParams);
    const queryString: string = buildUrlQueryString(distanceParams);
    return `${process.env.REACT_APP_PROXY_URL}https://maps.googleapis.com/maps/api/distancematrix/json?${queryString}${origins}${destinations}`;
}

function buildUrlDestinationParams(address: string[]): string {
    const destinationsQueryString = address.join('|').replace(/ /g, '+');
    return `&destinations=${destinationsQueryString}`;
}

function buildUrlOriginsParams(params: IDistanceMatrixParametres): string {
    const originsQueryString = params.origins.join('|').replace(/ /g, '+');
    return `&origins=${originsQueryString}`;
}

function buildUrlQueryString(distanceParams: IDistanceMatrixParametres): string {
    const params:IDistanceMatrixParametres = cleanEmptyPropetiesFromObjects(distanceParams)
    const googleMapsPlataformApiKey = process.env.REACT_APP_GOOGLE_MAPS_PLATAFORM_API_KEY || '';
    const requestParams: IDistanceMatrixParametresRequest = {
        ...params,
        key: googleMapsPlataformApiKey
    };
    return serialize(requestParams);
}

async function fetchDistanceMatrix(distanceParams: IDistanceMatrixParametres, address: string[]): Promise<IDistanceMatrixResponse> {
    const url = buildApiUrl(distanceParams, address)
    const response: Response = await fetch(url);
    return await response.json();
}

export {
    buildApiUrl,
    fetchDistanceMatrix
}
