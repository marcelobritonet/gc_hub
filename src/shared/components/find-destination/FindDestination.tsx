import React, {useState} from "react";
import DestinationList from "./destination-list/DestinationList";
import FindDestinationForm from "./find-destination-form/FindDestinationForm";
import {IDistanceMatrix} from "../../services/distance-matrix/distance-matrix.models";

function FindDestination() {
    const [distance, setDistance] = useState<IDistanceMatrix[]>([]);

    return (
        <div>
            <FindDestinationForm setDistance={setDistance} />
            <DestinationList distance={distance}/>
        </div>
    )
}

export default FindDestination;