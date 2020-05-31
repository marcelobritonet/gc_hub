import React, {useEffect, useRef, useState} from "react";
import {
    orderDistanceListByDistance,
    orderDistanceListByDuration,
    orderDistanceListByFare
} from '../../services/google-maps-plataform/google-maps-plataform.service';
import {ITraficModeOptions, ITransitModeOptions} from "./find-destination.models";
import {traficModes, transitModes} from "./find-destination.service";
import {
    IDistanceMatrix,
    IDistanceMatrixParametres, ITraficMode,
    ITransitMode
} from "../../services/google-maps-plataform/google-maps-plataform.models";
import {CEP_REGEX} from "../../constants/constants";
import {getDistanceMatrix} from "../../services/google-maps-plataform/google-maps-plataform.api";
import {getAddessByCep} from "../../services/viacep/viacep.api";
import {IAddress} from "../../services/viacep/viacep.models";
import DestinationList from "./destination-list/DestinationList";

function FindDestination() {
    // TODO: OBTER CEP DA API DO NAVEGADOR
    const traficModeSelect = useRef(null);
    const transitModeSelect = useRef(null);
    const originCepInput = useRef(null);

    const [originCep, setOriginCep] = useState<string>('');
    const [address, setAddress] = useState<IAddress | undefined>();
    const [traficMode, setTraficMode] = useState<ITraficMode>();
    const [transitMode, setTransitMode] = useState<ITransitMode>();
    const [sortBy, setSortBy] = useState<'nearest' | 'faster' | 'cheap' | undefined>();
    const [distance, setDistance] = useState<IDistanceMatrix[] | []>(); // TODO: Na ausencia de lista é melhor false, undefined ou []?
    const [loading, setLoading] = useState<boolean>(false)

    const getDistance = async () => {
        setDistance(undefined);
        setLoading(true);

        const params: IDistanceMatrixParametres = {
            origins: [originCep],
            mode: traficMode,
            transit_mode: transitMode
        };

        const addressList: IDistanceMatrix[] | [] = await getDistanceMatrix(params);

        switch (sortBy) {
            case 'faster':
                setDistance(orderDistanceListByDuration(addressList));
                break;
            case 'nearest':
                setDistance(orderDistanceListByDistance(addressList));
                break;
            case 'cheap':
                setDistance(orderDistanceListByFare(addressList));
                break;
            default:
                setDistance(orderDistanceListByDistance(addressList));
        }

        setLoading(false);
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
        <label>
            Meu CEP:
            <input type="text"
                   ref={originCepInput}
                   onKeyUp={handleOriginCep}
                   disabled={loading}
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

        <br/>

        <label>
            Pretendo ir:
            <select name="" id=""
                    ref={traficModeSelect}
                    onChange={handleTraficMode}
                    disabled={loading}
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
                        disabled={loading}
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
            disabled={!originCep || loading}
        >Encontre o mais próximo próximo</button>

        <br/>

        <button
            onClick={() => setSortBy('faster')}
            disabled={!originCep || loading}
        >Encontre o mais rápido para chegar</button>

        <br/>

        {
            transitMode &&
            <button
                onClick={() => setSortBy('cheap')}
                disabled={!originCep || loading}
            >O mais barato</button>
        }

        <DestinationList distance={distance}/>
    </div>
}


export default FindDestination;