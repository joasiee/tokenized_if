import { TokenManager } from "../../../token_registry/"
import dotenv from "dotenv";
dotenv.config();

export const TM = new TokenManager(process.env.GANACHE_URL, process.env.PRIVATE_KEY);
