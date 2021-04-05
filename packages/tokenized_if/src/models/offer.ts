import { Shipment } from "./shipment";

export interface Offer {
    id: number,
    owner: string,
    shipment: Shipment,
    contractAddress: string,
    price: number,
    buyback: number,
}

export interface AcceptOffer {
    financer: string,
    cargoHash: string,
}

export interface CreateOffer {
    owner: string,
    shipment: Shipment,
    contractAddress: string,
    price: number,
    buyback: number,
}