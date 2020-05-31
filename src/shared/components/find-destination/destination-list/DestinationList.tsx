import React from "react";
import {IDistanceMatrix} from "../../../services/google-maps-plataform/google-maps-plataform.models";

interface IDestinationList {
    distance: IDistanceMatrix[] | undefined;
}

function DestinationList(prop: IDestinationList) {
    const { distance } = prop;

    return (
        <ul>
            {
                distance
                    ? distance.map((item: IDistanceMatrix, index: number) =>
                        <li key={index}>
                            <p>{ item.address }</p>
                            <p>{ item.distance.text } - { item.duration.text }</p>
                            <p>{ item.fare?.text}</p>
                        </li>
                    )
                    : <li>Nenhum Resultado</li>
            }
        </ul>
    )
}

export default DestinationList;