import { queryValue, setKey } from "./helpers/query";

export const setRegistry = async function (address: string) {
    await setKey('registry', address);
};

export const getRegistry = async function () : Promise<string> {
    return await queryValue('registry');
};