import {IAddress} from "./viacep.models";

async function getAddessByCep(cep: string): Promise<IAddress> {
    const url: string = `https://viacep.com.br/ws/${cep}/json/`;
    const response: Response = await fetch(url);
    return await response.json();
}

export {
    getAddessByCep
}