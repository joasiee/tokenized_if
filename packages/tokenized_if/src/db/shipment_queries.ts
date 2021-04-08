import { CreateShipmentDao, Shipment } from "../models/shipment";
import { query } from "./helpers/query";

export const getAllShipments = async function () : Promise<Shipment[]> {
    const { rows } = await query("SELECT * from shipment");
    //let result = rows.map(mapDaoToShipment);
    return rows;
};

export const addShipment = async function (dao: CreateShipmentDao) : Promise<Shipment> {
    const values = [dao.cargo_hash, dao.owner, dao.escrow_address, dao.cargo];
    const { rows } = await query("INSERT INTO shipment(cargo_hash, owner, escrow_address, cargo) VALUES ($1, $2, $3, $4) returning *;", values);
    return rows[0];
}