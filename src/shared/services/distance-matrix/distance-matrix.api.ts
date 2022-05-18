//https://portal.distancematrixapi.com/dashboard

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
    return `${process.env.REACT_APP_DISTANCE_MATRIX_API_URL}?${queryString}${destinations}`;
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
    const googleMapsPlataformApiKey = process.env.REACT_APP_DISTANCE_MATRIX_API_KEY || '';
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