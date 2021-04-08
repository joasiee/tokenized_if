import { CreateOffer, Offer } from "../models/offer";
import { Shipment } from "../models/shipment";
import { query } from "./helpers/query";

const selectQuery =
`select o.id as offer_id
, o.financer
, o.contract_address
, o.price
, o.buyback
, s.cargo_hash as cargo_hash
, p.name as owner_name
, s.data json_data
, s.data_hash
from offer o
    join shipment s on s.data_hash = o.shipment_hash
    join participant p on p.name = s.owner;`

export const createOffer = async function (shipment_hash: string) : Promise<Offer> {
    const { rows } = await query("INSERT INTO offer(shipmentHash) VALUES($1) returning *;", [shipment_hash]);
    return rows[0];
}

export const getAllOffers = async function () : Promise<Offer[]> {
    const { rows } = await query("SELECT * FROM offer");
    return rows;
}