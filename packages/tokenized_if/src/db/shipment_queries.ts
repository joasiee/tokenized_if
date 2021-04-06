import { CreateShipmentDao, Shipment } from "../models/shipment";
import { query } from "./helpers/query";

// const mapDaoToShipment = function(dao: CreateShipmentDao) : Shipment {
//     return {
//         owner: dao.owner,
//         cargo: dao.cargo,
//         cargo_hash: dao.cargo_hash,
//     };
// }

export const getAllShipments = async function () : Promise<Shipment[]> {
    const { rows } = await query("SELECT * from shipment");
    //let result = rows.map(mapDaoToShipment);
    return rows;
};

export const addShipment = async function (dao: CreateShipmentDao) : Promise<Shipment> {
    const values = [dao.cargo_hash, dao.owner, dao.cargo];
    const { rows } = await query("INSERT INTO shipment(cargo_hash, owner, cargo) VALUES ($1, $2, $3) returning *;", values);
    return rows[0];
}