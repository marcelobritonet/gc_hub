import React from "react";
import {IDistanceMatrix} from "../../services/distance-matrix/distance-matrix.models";

export interface ITraficModeOptions {
    label: string;
    mode: string;
}

export interface ITransitModeOptions {
    label: string;
    mode: string;
}

export interface IFindDestinationForm {
    setDistance:  React.Dispatch<React.SetStateAction<IDistanceMatrix[]>>
}