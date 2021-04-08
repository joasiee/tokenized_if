import crypto from "crypto";

function sha256(preimage: Buffer): string {
  return crypto
    .createHash("sha256")
    .update(preimage)
    .digest("hex");
}

function unpack128(number: BigInt): string {
  number = BigInt.asUintN(128, number.valueOf());
  return number.toString(16).padStart(32, "0");
}

export function concatThenHash(bigInts: BigInt[]): string {
  const concat = bigInts.map(x => unpack128(x)).join("");
  return sha256(Buffer.from(concat, "hex"));
}
