import React, {useEffect} from "react";
import {getDistanceMatrix} from '../../services/google-maps-plataform/google-maps-plataform.service';

function Maps() {
    useEffect(() => {
        getDistance()
    });

    const getDistance = async () => {
        const data = await getDistanceMatrix();
        await console.log(data);
    };

    return <div>map</div>
}

export default Maps;