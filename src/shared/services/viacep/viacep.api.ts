import {IAddress} from "./viacep.models";
import {CEP_RAW_REGEX} from "../../constants/constants";

async function fetchAddessByCep(cep: string): Promise<IAddress | null> {
    const match: RegExpExecArray | null = CEP_RAW_REGEX.exec(cep);
    const url: string = buildUrl(cep);

    if (!match) {
        return null;
    } else {
        const response: Response = await fetch(url);
        return await response.json();
    }
}

function buildUrl(cep: string): string {
    return `https://viacep.com.br/ws/${cep}/json/`;
}

export {
    buildUrl,
    fetchAddessByCep
}