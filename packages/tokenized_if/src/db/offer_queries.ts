import { CreateOffer, Offer } from "../models/offer";
import { query } from "./helpers/query";

export const createOffer = async function (dco: CreateOffer) {
    
}

export const getAllOffers = async function () : Promise<Offer[]> {
    const { rows } = await query("SELECT * FROM offer");
    return rows;
}