import {get, set} from "../local-storage/local-storage.service";

const PERSISTED_REQUESTS_KEY = 'persisted_requests';

interface IRequestCached {
    url: string;
    response: any;
    dateCreate: Date;
}

function cacheRequest(url: string, response: any) {
    // TODO: MATAR O CACHE BASEADO EM TEMPO
    // TODO: IMPLEMENTAR CACHE SCHEMA
    // TODO: MATAR TODO CACHE CASO SCHEMA VERSION MUDE
    if(!url || !response || response.erro) {
        return null
    }

    const cache = get(PERSISTED_REQUESTS_KEY) || [];
    const find =  cache.find((item: any) => item.url === url);

    if(!find) {
        const newCacheItem: IRequestCached = {
            url,
            response,
            dateCreate: new Date()
        };

        set(PERSISTED_REQUESTS_KEY, [...cache, newCacheItem]);
    }
}

function retrieveCache(url: string): any {
    const persistedCacheList: IRequestCached[] | [] = get(PERSISTED_REQUESTS_KEY) || [];
    const item = persistedCacheList
        && persistedCacheList.length > 0
        && persistedCacheList.find((item: any) =>
            item.url === url
        );
    return item && item.response || null;
}

export {
    cacheRequest,
    retrieveCache
};
