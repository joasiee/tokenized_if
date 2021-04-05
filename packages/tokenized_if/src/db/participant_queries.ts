import { CreateParticipant, Participant } from "../models/participant";
import pool from "./helpers/pool";

const mapToParticipant = function(obj: any) : Participant {
    return {
        id: obj.id,
        name: obj.name,
        address: obj.address,
    }
}

export const getParticipant = async function name(id: number) : Promise<Participant> {
    const { rows } = await pool.query("SELECT * FROM participant WHERE id=$1", [id]);
    if (rows.length > 0) {
        return mapToParticipant(rows[0]);
    }
};

export const getAllParticipants = async function () : Promise<Participant[]> {
    const { rows } = await pool.query("SELECT * FROM participant");
    return rows.map(mapToParticipant);
};

export const addParticipant = async function (dco: CreateParticipant) :Promise<Participant> {
    const values = [dco.name, dco.address];
    const { rows } = await pool.query("INSERT INTO participant(name, address) VALUES ($1, $2) returning *", values);
    return mapToParticipant(rows[0]);
}