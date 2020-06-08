import {IAddress} from "./viacep.models";
import {CEP_RAW_REGEX} from "../../constants/constants";

async function getAddessByCep(cep: string): Promise<IAddress | null> {
    const match: RegExpExecArray | null = CEP_RAW_REGEX.exec(cep);

    if (!match) {
        return null
    }

    const url: string = `https://viacep.com.br/ws/${cep}/json/`;
    const response: Response = await fetch(url);
    return await response.json();
}

export {
    getAddessByCep
}