import { Shipment } from "./shipment";

export interface Offer {
    id: number,
    owner: string,
    shipmentId: number,
    contractAddress?: string,
    price: number,
    buyback: number,
}

export interface AcceptOffer {
    cargoHash: string,
}

export interface EscrowAddress {
    address: string,
    tokenRegistryAddress?: string,
}

export interface CreateOffer {
    price: number,
    buyback: number,
}