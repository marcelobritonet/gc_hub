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
    fullAddress: string;
    address: string;
    distance: Distance;
    duration: Distance;
    fare: Fare;
    status: string;
}

export interface IDistanceMatrixResponse {
    destination_addresses: string[];
    origin_addresses: string[];
    rows: Row[];
    status: 'OK' | 'ZERO_RESULTS' | 'NOT_FOUND'
}

interface Row {
    elements: Element[];
}

interface Element {
    distance: Distance;
    duration: Distance;
    status: string;
    fare: Fare;
}

interface Distance {
    text: string;
    value: number;
}

interface Fare {
    currency: string;
    text: string;
    value: number;
}