const { scrypt } = require("scrypt-js");
const { Buffer } = require("buffer");
const { ethers } = require("ethers");

const HASH_OPTIONS = {
  N: 1024 * 32, // CPU/memory cost parameter (must be a power of 2, > 1)
  r: 8, // block size parameter
  p: 5, // parallelization parameter
  keyLen: 64, // length of derived key
};
const abi = new ethers.AbiCoder();

async function main() {
  const passphrase = "DemoAccount5&";
  const pin = "112324";

  const salt = `${passphrase.slice(-4)}${pin}`;

  const passwordBuffer = Buffer.from(passphrase);
  const saltBuffer = Buffer.from(salt);
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
