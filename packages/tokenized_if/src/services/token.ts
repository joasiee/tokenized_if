import { createTokenManager } from "../../../token_registry/"
import dotenv from "dotenv";
import { setRegistry } from "../db/registry_queries";

dotenv.config();

export const tm = createTokenManager({
  ganacheUrl: process.env.GANACHE_URL,
  privateKey: process.env.PRIVATE_KEY,
});

export async function tokenSetup(registryAddress?: string) {
  if (!registryAddress) {
    // ONLY EXECUTED BY LSP ON FIRST RUN
    await tm.setupTokenRegistry();
    console.log("Token registry setup executed");
    registryAddress = tm.tokenRegistry.address;
    await setRegistry(registryAddress);
    console.log("Token registry set in DB");
  } else {
    tm.connectTokenRegistry(registryAddress, tm.signer);
    console.log(`Connected to Token registry address: ${registryAddress}`);
  }
}
