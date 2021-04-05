import { Cargo } from "./cargo";

export interface Shipment {
    id: number,
    owner: string,
    cargo: Cargo,
    cargo_hash: string,
}