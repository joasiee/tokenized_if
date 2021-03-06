import { Cargo } from "./cargo";
import { Shipment } from "./shipment";

export interface Offer {
    id?: number,
    shipment: Shipment,
    financer?: string,
    price: number,
    buyback: number,
}

export interface CreateOfferDao {
    shipment_id: number,
    price: number,
    buyback: number,
}

export interface OfferDao {
    id: number;
    shipment_id: number,
    financer?: string,
    price: number,
    buyback: number,
}

export interface OfferShipmentDao extends OfferDao {
    owner: string,
    cargo: Cargo,
    cargo_hash: string,
    escrow_address: string,
}

export interface AcceptOffer {
    cargo_hash: string,
    financer: string,
}