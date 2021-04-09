import { createTokenManager } from "@tokenized_if/token-registry"
import dotenv from "dotenv";
import { setTokenRegistry } from "../db/registry_queries";

// Load in the .env file
dotenv.config();

/**
 * tm is exported. So this TokenManager can be accessed from elsewhere.
 * It contains the ganache URL and the private key, both loaded in from the .env file.
 */
export const tm = createTokenManager({
  ganacheUrl: process.env.GANACHE_URL,
  privateKey: process.env.PRIVATE_KEY,
});

/**
 * The tokenSetup function to either deploy the token registry or to simply connect to it.
 * @param registryAddress An optional token registry address.
 */
export async function tokenSetup(registryAddress?: string) {
  if (!registryAddress) {
    // ONLY EXECUTED BY LSP ON FIRST RUN
    await tm.setupTokenRegistry();
    console.log("Token registry setup executed");
    registryAddress = tm.tokenRegistry.address;
    await setTokenRegistry(registryAddress);
    console.log("Token registry set in DB");
  } else {
    tm.connectTokenRegistry(registryAddress, tm.signer);
    console.log(`Connected to Token registry address: ${registryAddress}`);
  }
}