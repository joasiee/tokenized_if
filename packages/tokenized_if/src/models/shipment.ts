import { Cargo } from "./cargo";

export interface Shipment {
    owner: string,
    cargo: Cargo,
    cargo_hash: string,
    escrow_address: string,
}

export interface ShipmentDao extends Shipment {
    id: number;
}

export interface CreateShipmentObject {
    owner: string,
    cargo: Cargo,
}

export interface CreateShipmentDao {
    owner: string,
    cargo: string,
    cargo_hash: string,
    escrow_address: string,
}
