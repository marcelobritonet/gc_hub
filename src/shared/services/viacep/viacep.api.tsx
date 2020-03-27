import {IAddress} from "./viacep.models";

const getAddessByCep = async (cep: string): Promise<IAddress> => {
    const url: string = `https://viacep.com.br/ws/${cep}/json/`;
    const response: Response = await fetch(url);
    const data: IAddress = await response.json();
    return data;

};

export {
    getAddessByCep
}