import { CreateShipmentDao, Shipment, ShipmentDao } from "../models/shipment";
import { query } from "./helpers/query";

export const getAllShipments = async function () : Promise<ShipmentDao[]> {
    const { rows } = await query("SELECT * FROM shipment");
    return rows;
};

export const getShipmentById = async function (shipmentId: number) : Promise<ShipmentDao> {
    const { rows } = await query("SELECT * FROM shipment WHERE id = $1", [shipmentId]);
    return rows[0];
}

export const getShipmentByHash = async function (shipmentHash: string) : Promise<ShipmentDao> {
    const { rows } = await query("SELECT * FROM shipment WHERE cargo_hash = $1", [shipmentHash]);
    return rows[0];
}

export const addShipment = async function (dao: CreateShipmentDao) : Promise<ShipmentDao> {
    const values = [dao.cargo_hash, dao.owner, dao.escrow_address, dao.cargo];
    const { rows } = await query("INSERT INTO shipment(cargo_hash, owner, escrow_address, cargo) VALUES ($1, $2, $3, $4) returning *;", values);
    return rows[0];
}