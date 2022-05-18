import React, {useEffect, useRef, useState} from "react";
import {getDestinationAddress, persistZipCode, getDistanceMatrix, getAddessByCep} from "../find-destination.service";
import {IFindDestinationForm, ITraficModeOptions, ITransitModeOptions} from "../find-destination.models";
import {IAddress} from "../../../services/viacep/viacep.models";
import {
    IDistanceMatrix,
    IDistanceMatrixParametres, IDistanceMatrixResponse,
    ITraficMode,
    ITransitMode
} from "../../../services/distance-matrix/distance-matrix.models";
import {
    buildDistanceList,
    orderDistanceListByDistance,
    orderDistanceListByDuration,
    orderDistanceListByFare
} from "../../../services/distance-matrix/distance-matrix.service";
import {CEP_REGEX} from "../../../constants/constants";
import {TextField, Select, RadioGroup, FormControlLabel, Radio, Button} from "@material-ui/core";
import {compose} from "../../../services/util/util.service";
import {traficModes, transitModes} from "../find-destination.constants";

function FindDestinationForm(prop: IFindDestinationForm) {
    // TODO: TRATAR CEP INEXISTENTE / NÃO ENCONTRADO
    // TODO: OBTER CEP DA API DO NAVEGADOR
    // TODO: BUG NA TROCA DE CEP

    const { setDistance } = prop;

    const traficModeSelect = useRef(null);
    const transitModeSelect = useRef(null);
    const originCepInput = useRef(null);

    const [originCep, setOriginCep] = useState<string>('');
    const [address, setAddress] = useState<IAddress | undefined>();
    const [traficMode, setTraficMode] = useState<ITraficMode>();
    const [transitMode, setTransitMode] = useState<ITransitMode>();
    const [sortBy, setSortBy] = useState<'nearest' | 'faster' | 'cheap' | undefined>('nearest');
    const [loading, setLoading] = useState<boolean>(false)

    const getDistance = async () => {
        setDistance([]);
        setLoading(true);

        const params: IDistanceMatrixParametres = {
            origins: [originCep],
            // mode: traficMode,
            // transit_mode: transitMode
        };

        const address: string[] = await getDestinationAddress();
        const response: IDistanceMatrixResponse = await getDistanceMatrix(params, address);
        const addressList: IDistanceMatrix[] = buildDistanceList(response, address);

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
        const getAddressComposition = compose(
            persistZipCode,
            getAddessByCep
        )

        const address = await getAddressComposition(cep)
        setAddress(address)
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

    const handleSortBy = (event: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore-next-line
        setSortBy((event.target as HTMLInputElement).value)
    }

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

    return <div>
        <TextField
            id="standard-basic"
            label="CEP"
            onKeyUp={handleOriginCep}
            inputRef={originCepInput}
        />

        { address &&
        <div>
            <p>{address.logradouro} {address.complemento} {address.bairro}, {address.cep}</p>
            <p>{address.localidade}, {address.uf}</p>
        </div>
        }

        <br/>

        <Select
            native
            value={traficMode}
            onChange={handleTraficMode}
            inputRef={traficModeSelect}
        >
            { traficModes.map((mode: ITraficModeOptions, index: number) =>
                <option
                    key={index}
                    value={mode.mode}
                >{mode.label}</option>
            )}
        </Select>

        <br/>

        {traficMode === 'transit' &&
        <Select
            native
            value={transitMode}
            onChange={handelTransitMode}
            inputRef={transitModeSelect}
            disabled={loading}
        >
            { transitModes.map((mode: ITransitModeOptions, index: number) =>
            <option
                key={index}
                value={mode.mode}
            >{mode.label}</option>
            )}
        </Select>
        }

        <RadioGroup
            onChange={handleSortBy}
            value={sortBy}
        >
            <FormControlLabel value="nearest" control={<Radio />} label="Mais próximo" />
            <FormControlLabel value="faster" control={<Radio />} label="Mais rápido" />
            { transitMode &&
            <FormControlLabel value="cheap" control={<Radio />} label="Mais barato" />
            }
        </RadioGroup>

        <Button
            disabled={!originCep || !sortBy}
            onClick={() => getDistance()}
        >Buscar</Button>
    </div>
}

export default FindDestinationForm;