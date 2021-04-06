import { createTokenManager } from "../../../token_registry/"
import dotenv from "dotenv";

dotenv.config();

export const tm = createTokenManager({
    ganacheUrl: process.env.GANACHE_URL,
    privateKey: process.env.PRIVATE_KEY,
});
