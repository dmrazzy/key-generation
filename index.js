const { scrypt } = require("scrypt-js");
const { Buffer } = require("buffer");
const { ethers } = require("ethers");

const HASH_OPTIONS = {
  N: 1024 * 128, // CPU/memory cost parameter 2^17, OWASP Recommendation
  r: 8, // block size parameter
  p: 1, // parallelization parameter
  keyLen: 64, // length of derived key
};
const KDF_DOMAIN_SEPARATOR = "mybucks.online-core.generateHash.v2";

const abi = new ethers.AbiCoder();

async function main() {
  const passphrase = "DemoAccount5&";
  const pin = "112324";

  const passwordBuffer = Buffer.from(passphrase);
  const encoded = abi.encode(
    ["string", "string", "string"],
    [KDF_DOMAIN_SEPARATOR, passphrase, pin],
  );
  const saltHash = ethers.keccak256(encoded);
  const saltBuffer = Buffer.from(saltHash.slice(2), "hex");
  const progressCallback = (percentage) => {
    process.stdout.write(".");
  }

  const start = performance.now();
  const hashBuffer = await scrypt(
    passwordBuffer,
    saltBuffer,
    HASH_OPTIONS.N,
    HASH_OPTIONS.r,
    HASH_OPTIONS.p,
    HASH_OPTIONS.keyLen,
    progressCallback
  );
  const hashHex = Buffer.from(hashBuffer).toString("hex");
  const privateKey = ethers.keccak256(abi.encode(["string"], [hashHex]));
  const wallet = new ethers.Wallet(privateKey);
  const end = performance.now();

  console.log("\nDone!");
  console.log("Calculation Time: ", (end - start) / 1000);
  console.log("Hash: ", hashHex);
  console.log("Private Key: ", privateKey);
  console.log("Wallet Address: ", wallet.address);
}

main()
  .then(() => {
    process.exit();
  })
  .catch(() => {
    console.error("Failed to execute.");
  });
