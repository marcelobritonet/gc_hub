import {set} from '../../services/local-storage/local-storage.service';
import {IAddress} from "../../services/viacep/viacep.models";
import {buildUrl as buildAddressByCepApiUrl, fetchAddessByCep} from "../../services/viacep/viacep.api";
import {cacheRequest, retrieveCache} from "../../services/local-cache/local-cache";
import {
    IDistanceMatrixParametres,
    IDistanceMatrixResponse
} from "../../services/distance-matrix/distance-matrix.models";
import {buildApiUrl, fetchDistanceMatrix} from "../../services/distance-matrix/distance-matrix.api";
import {IGroup} from "../../services/group/group.models";
import {getGroupList} from "../../services/group/group.service";

const ZIP_CODE_KEY_STORAGE = 'zip-code';

function persistZipCode(zipCode: string) {
    return set(ZIP_CODE_KEY_STORAGE, zipCode);
}

async function getAddessByCep(cep: string): Promise<IAddress | null> {
    const url = buildAddressByCepApiUrl(cep);
    const cache = retrieveCache(url);

    if(cache) {
        return cache;
    } else {
        const response = await fetchAddessByCep(cep)
        cacheRequest(url, response);
        return response;
    }
}

async function getDistanceMatrix(distanceParams: IDistanceMatrixParametres, address: string[]): Promise<IDistanceMatrixResponse> {
    const url = buildApiUrl(distanceParams, address)
    const cache = retrieveCache(url);

    if(cache) {
        return await cache;
    } else {
        const data = await fetchDistanceMatrix(distanceParams, address);
        cacheRequest(url, data);
        return data;
    }
}

async function getDestinationAddress(): Promise<string[]> {
    const groups: IGroup[] = await getGroupList();
    return groups.map(group => group.address);
}

export {
    getDestinationAddress,
    getDistanceMatrix,
    getAddessByCep,
    persistZipCode
}
