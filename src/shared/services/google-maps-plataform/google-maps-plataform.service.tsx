import {
    IDistanceMatrix,
    IDistanceMatrixResponse
} from "./google-maps-plataform.models";

const buildDistanceList = (list: IDistanceMatrixResponse): IDistanceMatrix[] => {
    return list.destination_addresses.map((address: string, index: number) => {
        const element = list.rows[0].elements[index];

        return {
            address: address,
            distance: element.distance,
            duration: element.duration
        }
    })
};

const orderDistanceListByDistance = (list: IDistanceMatrix[]): IDistanceMatrix[] =>
    list.sort((a: IDistanceMatrix, b: IDistanceMatrix) =>
        a.distance.value - b.distance.value);

const orderDistanceListByDuration = (list: IDistanceMatrix[]): IDistanceMatrix[] =>
    list.sort((a: IDistanceMatrix, b: IDistanceMatrix) =>
        a.duration.value - b.duration.value);

export {
    buildDistanceList,
    orderDistanceListByDistance,
    orderDistanceListByDuration
}