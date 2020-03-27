import React, {useEffect, useRef, useState} from "react";
import {
    orderDistanceListByDistance,
    orderDistanceListByDuration
} from '../../services/google-maps-plataform/google-maps-plataform.service';
import {ITraficModeOptions, ITransitModeOptions} from "./maps.models";
import {traficModes, transitModes} from "./maps.service";
import {
    IDistanceMatrix,
    IDistanceMatrixParametres, ITraficMode,
    ITransitMode
} from "../../services/google-maps-plataform/google-maps-plataform.models";
import {CEP_REGEX} from "../../constants/constants";
import {getDistanceMatrix} from "../../services/google-maps-plataform/google-maps-plataform.api";
import {getAddessByCep} from "../../services/viacep/viacep.api";
import {IAddress} from "../../services/viacep/viacep.models";

function Maps() {
    const traficModeSelect = useRef(null);
    const transitModeSelect = useRef(null);
    const originCepInput = useRef(null);

    const [originCep, setOriginCep] = useState<string>('');
    const [address, setAddress] = useState<IAddress | undefined>();
    const [traficMode, setTraficMode] = useState<ITraficMode>();
    const [transitMode, setTransitMode] = useState<ITransitMode>();
    const [sortBy, setSortBy] = useState<'nearest' | 'faster' | undefined>();
    const [distance, setDistance] = useState<IDistanceMatrix[] | undefined>();

    const getDistance = async () => {
        const params: IDistanceMatrixParametres = {
            origins: [originCep],
            mode: traficMode,
            transit_mode: transitMode
        };

        const addressList: IDistanceMatrix[] = await getDistanceMatrix(params);

        switch (sortBy) {
            case 'faster':
                setDistance(orderDistanceListByDuration(addressList));
                break;
            case 'nearest':
                setDistance(orderDistanceListByDistance(addressList));
                break;
            default:
                setDistance(orderDistanceListByDistance(addressList));
        }
    };

    const getAddress = async (cep: string) => {
        const address = cep ? await getAddessByCep(cep) : undefined;
        await setAddress(address)
    };

    const handleOriginCep = () => {
        // @ts-ignore-next-line
        const value = originCepInput.current.value;
        const match = CEP_REGEX.exec(value);
        match && setOriginCep(match[0]);
    };

    const handleTraficMode = () => {
        // @ts-ignore-next-line
        setTraficMode(traficModeSelect.current.value);
    };

    const handelTransitMode = () => {
        // @ts-ignore-next-line
        setTransitMode(transitModeSelect.current.value);
    };

    useEffect(() => {
        handleTraficMode();
        getAddress(originCep);
    }, [originCep]);

    useEffect(() => {
        if(traficMode === 'transit') {
            handelTransitMode();
        } else {
            setTransitMode(undefined)
        }
    }, [traficMode]);

    useEffect(() => {
        originCep && sortBy && getDistance();
    }, [sortBy, originCep, traficMode, transitMode]);

    return <div>
        <h2>Maps</h2>

        <label>
            Meu CEP:
            <input type="text"
                   ref={originCepInput}
                   onKeyUp={handleOriginCep}
            />
        </label>

        {
            address &&
                <div>
                    <p>{address.cep}</p>
                    <p>{address.logradouro}</p>
                    <p>{address.complemento}</p>
                    <p>{address.bairro}</p>
                    <p>{address.localidade}</p>
                    <p>{address.uf}</p>
                </div>
        }


        <label>
            Pretendo ir:
            <select name="" id=""
                    ref={traficModeSelect}
                    onChange={handleTraficMode}
            >
                {
                    traficModes.map((mode: ITraficModeOptions, index: number) =>
                        <option
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

        <button
            onClick={() => setSortBy('nearest')}
            disabled={!originCep}
        >O mais próximo próximo de mim</button>

        <button
            onClick={() => setSortBy('faster')}
            disabled={!originCep}
        >O mais rápido para chegar</button>

        <ul>
            {
                distance && distance.map((item: IDistanceMatrix, index: number) =>
                    <li key={index}>
                        <p>{ item.address }</p>
                        <p>{ item.distance.text }</p>
                        <p>{ item.duration.text }</p>
                    </li>
                )
            }
        </ul>
    </div>
}

export default Maps;