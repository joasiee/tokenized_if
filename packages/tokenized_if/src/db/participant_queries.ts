import { Participant } from "../models/participant";
import { query } from "./helpers/query";

export const getParticipant = async function (name: string) : Promise<Participant> {
    const { rows } = await query("SELECT * FROM participant WHERE name=$1", [name]);
    if (rows.length > 0) {
        return rows[0];
    }
    return null;
};

export const getAllParticipants = async function () : Promise<Participant[]> {
    const { rows } = await query("SELECT * FROM participant");
    return rows;
};

export const addParticipant = async function (dco: Participant) :Promise<Participant> {
    const values = [dco.name, dco.address, dco.nats, dco.role];
    const { rows } = await query("INSERT INTO participant(name, address, nats, role) VALUES ($1, $2, $3, $4) returning *", values);
    return rows[0];
};
