import {ITraficModeOptions, ITransitModeOptions} from "./find-destination.models";

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

export {
    traficModes,
    transitModes
}
