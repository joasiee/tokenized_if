import { CreateShipment, Shipment } from "../models/shipment";
import { query } from "./helpers/query";

const selectQuery = 
`select s.id
, p.name as owner
, s.data
, s.data_hash
from shipment s
    join participant p on p.id = s.owner_id;`

const mapDaoToShipment = function(dao: any) : Shipment {
    return {
        id: dao.id,
        owner: dao.owner,
        cargo: JSON.parse(dao.data),
        cargo_hash: dao.hash,
    }
}

export const getAllShipments = async function () : Promise<Shipment[]> {
    const { rows } = await query(selectQuery);
    let result = rows.map(mapDaoToShipment);
    return result;
};

export const addShipment = async function (dco: CreateShipment) : Promise<Shipment> {
    const values = [dco.owner, JSON.stringify(dco.cargo), dco.cargo_hash];
    const { rows } = await query("INSERT INTO shipment(owner_id, data, data_hash) VALUES ($1, $2, $3) returning *;", values);
    return mapDaoToShipment(rows[0]);
}