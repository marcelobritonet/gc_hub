export interface IDistanceMatrixParametresRequest {
    key: string;
    mode?: ITraficMode;
    units?: 'metric' | 'imperial',
    transit_mode?: ITransitMode
}

export interface IDistanceMatrixParametres {
    origins: string[];
    mode?: ITraficMode;
    transit_mode?: ITransitMode
}

export interface ITraficMode {
    mode?: 'driving' | 'walking' | 'bicycling' | 'transit';
}

export interface ITransitMode {
    transit_mode: 'bus' | 'subway' | 'train' | 'tram' | 'rail'
}

export interface IDistanceMatrix {
    address: string;
    distance: Distance;
    duration: Distance;
}

export interface IDistanceMatrixResponse {
    destination_addresses: string[];
    origin_addresses: string[];
    rows: Row[];
    status: string;
}

interface Row {
    elements: Element[];
}

interface Element {
    distance: Distance;
    duration: Distance;
    status: string;
}

interface Distance {
    text: string;
    value: number;
}