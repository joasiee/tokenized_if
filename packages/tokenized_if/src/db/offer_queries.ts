import { CreateOfferDao, Offer, OfferShipmentDao } from "../models/offer";
import { query } from "./helpers/query";
import { getParticipantByAddress } from "./participant_queries";

function mapDaoToOffer(dao : OfferShipmentDao) : Offer {
    return {
        id: dao.id,
        financer: dao.financer,
        price: dao.price,
        buyback: dao.buyback,
        shipment: {
            cargo: dao.cargo,
            cargo_hash: dao.cargo_hash,
            owner: dao.owner,
            escrow_address: dao.escrow_address,
        },        
    };
}

const selectQuery =
`select o.id,
    o.shipment_id,
    o.financer,
    o.price,
    o.buyback,
    s.cargo_hash,
    s.escrow_address,
    s.owner,
    s.cargo
from offer o
    join shipment s on s.id = o.shipment_id`;

export const createOffer = async function (offer : CreateOfferDao) : Promise<Offer> {
    const values = [offer.shipment_id, offer.price, offer.buyback];
    const { rows } = await query("INSERT INTO offer(shipment_id, price, buyback) VALUES($1, $2, $3) returning *;", values);
    const offerId = rows[0].id;
    const insertedOffer = await getOfferById(offerId);
    return insertedOffer;
}

export const setFinancer = async function (offerId: number, financerAddress: string) : Promise<void> {
    const participant = await getParticipantByAddress(financerAddress);
    await query("UPDATE offer SET financer=$1 WHERE id = $2", [participant.name, offerId]);
}

export const getOfferById = async function (offerId: number) : Promise<Offer> {
    const { rows } = await query(selectQuery + "\n\tWHERE o.id = $1", [offerId]);
    if (rows.length > 0) {
        return mapDaoToOffer(rows[0]);
    }
}

export const getOfferByHash = async function (shipmentHash: string) : Promise<Offer> {
    const { rows } = await query(selectQuery + "\n\tWHERE s.cargo_hash = $1", [shipmentHash]);
    if (rows.length > 0) {
        return mapDaoToOffer(rows[0]);
    }
}

export const getAllOffers = async function () : Promise<Offer[]> {
    const { rows } = await query(selectQuery);
    return rows.map(mapDaoToOffer);
}