import {
    IDistanceMatrix,
    IDistanceMatrixResponse
} from "./distance-matrix.models";

function buildDistanceList(list: IDistanceMatrixResponse, destinations: string[]): IDistanceMatrix[] {
    return list.destination_addresses
        .map((address: string, index: number): IDistanceMatrix => {
            const { distance, duration, fare, status } = list.rows[0].elements[index];

            return {
                fullAddress: address,
                address: destinations[index],
                distance,
                duration,
                fare,
                status
            }
        })
        .filter((address: IDistanceMatrix) =>
            address.status === 'OK'
            && address.distance
            && address.duration
        )
}

function orderDistanceListByDistance(list: IDistanceMatrix[]): IDistanceMatrix[] {
    return list.sort((a: IDistanceMatrix, b: IDistanceMatrix) =>
        a.distance.value - b.distance.value);
}

function orderDistanceListByDuration(list: IDistanceMatrix[]): IDistanceMatrix[] {
    return list.sort((a: IDistanceMatrix, b: IDistanceMatrix) =>
        a.duration.value - b.duration.value);
}

function orderDistanceListByFare(list: IDistanceMatrix[]): IDistanceMatrix[] {
    return list.sort((a: IDistanceMatrix, b: IDistanceMatrix) =>
        a.fare.value - b.fare.value);
}

export {
    buildDistanceList,
    orderDistanceListByDistance,
    orderDistanceListByDuration,
    orderDistanceListByFare
}