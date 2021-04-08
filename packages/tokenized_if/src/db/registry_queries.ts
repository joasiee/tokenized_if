import { queryValue, setKey } from "./helpers/query";

export const setTokenRegistry = async function (address: string) {
    await setKey('token_registry', address);
};

export const getTokenRegistry = async function () : Promise<string> {
    return await queryValue('token_registry');
};