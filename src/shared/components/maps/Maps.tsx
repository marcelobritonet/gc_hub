import React, {useEffect, useRef, useState} from "react";
import {getDistanceMatrix} from '../../services/google-maps-plataform/google-maps-plataform.service';
import {ITraficModeOptions, ITransitModeOptions} from "./maps.models";
import {traficModes, transitModes} from "./maps.service";
import {
    IDistanceMatrixParametres, ITraficMode,
    ITransitMode
} from "../../services/google-maps-plataform/google-maps-plataform.models";

function Maps() {
    const traficModeSelect = useRef(null);
    const transitModeSelect = useRef(null);
    const originCepInput = useRef(null);

    const [originCep, setOriginCep] = useState<string>('22775170');
    const [traficMode, setTraficMode] = useState<ITraficMode>();
    const [transitMode, setTransitMode] = useState<ITransitMode>();

    useEffect(() => {
        handleTraficMode();
    }, [originCep]);

    useEffect(() => {
        if(traficMode === 'transit') {
            handelTransitMode();
        } else {
            setTransitMode(undefined)
        }
    }, [traficMode]);

    const getDistance = async () => {const params: IDistanceMatrixParametres = {
            origins: originCep ? [originCep] : [],
            mode: traficMode,
            transit_mode: transitMode
        };
        const data = originCep && await getDistanceMatrix(params);
        await console.log(data);
    };

    const handleOriginCep = () => {
        // @ts-ignore-next-line
        setOriginCep(originCepInput.current.value);
    };

    const handleTraficMode = () => {
        // @ts-ignore-next-line
        setTraficMode(traficModeSelect.current.value);
    };

    const handelTransitMode = () => {
        // @ts-ignore-next-line
        setTransitMode(transitModeSelect.current.value);
    };

    return <div>
        <h2>Maps</h2>

        <label>
            Meu CEP:
            <input type="text"
                   ref={originCepInput}
                   onBlur={handleOriginCep}
            />
        </label>

        <br/>

        <label>
            Pretendo ir:
            <select name="" id=""
                    ref={traficModeSelect}
                    onChange={handleTraficMode}
            >
                {
                    traficModes.map((mode: ITraficModeOptions, index: number) =>
                        <option
                            onChange={() => handleTraficMode()}
                            key={index}
                            value={mode.mode}
                        >{mode.label}</option>
                    )
                }
            </select>
        </label>

        <br/>

        {
            traficMode === 'transit' && <label>
                Meio de transporte preferencial:
                <select name="" id=""
                        ref={transitModeSelect}
                        onChange={handelTransitMode}
                >
                    {
                        transitModes.map((mode: ITransitModeOptions, index: number) =>
                            <option
                                key={index}
                                value={mode.mode}
                            >{mode.label}</option>
                        )
                    }
                </select>
            </label>
        }

        <br/>

        <button onClick={getDistance}>Get</button>
    </div>
}

export default Maps;