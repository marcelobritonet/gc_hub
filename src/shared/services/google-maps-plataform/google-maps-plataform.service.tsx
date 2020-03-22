import {serialize} from "../util/util.service";

const GOOGLE_MAPS_PLATAFORM_API_KEY = 'AIzaSyAt3lE0_ahSc9Bd5GOvtKG52NIEnzgVBmw';

interface IDistanceMatrixParametres {
    origins: string;
    destinations: string;
    key: string;
    mode?: 'driving' | 'walking' | 'bicycling' | 'transit';
    units?: 'metric' | 'imperial',
    transit_mode?: 'bus' | 'subway' | 'train' | 'tram' | 'rail'
}

const getDistanceMatrix = async () => {
    const origins: string = 'Rua Iguaba Grande, 78';
    const destinations: string = 'Avenida das Américas, 500';
    const distanceMatrixParametres: IDistanceMatrixParametres = {
        origins,
        destinations,
        key: GOOGLE_MAPS_PLATAFORM_API_KEY,
        mode: 'driving',
        units: 'metric',
        transit_mode: 'bus'
    };
    const parameters = serialize(distanceMatrixParametres);
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?${parameters}`;
    const response = await fetch(url);debugger
    const data = await response.json();
    return data;
};

export {
    GOOGLE_MAPS_PLATAFORM_API_KEY,
    getDistanceMatrix
}