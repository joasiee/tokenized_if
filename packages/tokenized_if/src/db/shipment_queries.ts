import { ShipmentDao, ShipmentDto } from "../models/shipment";
import pool from "./helpers/pool";

const selectQuery = 
`select s.id
, p.name as owner
, s.data
, s.data_hash
from shipment s
    join participant p on p.id = s.owner_id;`

const mapDaoToDto = function(dao: any) : ShipmentDto {
    return {
        name:
    }
}

export const getAllParticipants = async function () : Promise<ShipmentDto[]> {
    const { rows } = await pool.query("SELECT * FROM shipment join participant on ");
    return rows.map(mapToParticipant);
};