import {ITraficModeOptions, ITransitModeOptions} from "./find-destination.models";
import LocalStorage from '../../services/local-storage/local-storage.service';

const ZIP_CODE_KEY_STORAGE = 'zip-code';

const traficModes: ITraficModeOptions[] = [
    {
        label: 'Dirigindo',
        mode: 'driving'
    }, {
        label: 'Andando',
        mode: 'walking'
    }, {
        label: 'Pedalando',
        mode: 'bicycling'
    }, {
        label: 'Transporte Público',
        mode: 'transit'
    }
];

const transitModes: ITransitModeOptions[] = [
    {
        label: 'Ônibus',
        mode: 'bus'
    }, {
        label: 'Metrô',
        mode: 'subway'
    }, {
        label: 'Trem',
        mode: 'train'
    },
];

function persistLocallyZipCode(zipCode: string) {
    return LocalStorage.set(ZIP_CODE_KEY_STORAGE, zipCode);
}

export {
    persistLocallyZipCode,
    traficModes,
    transitModes
}
