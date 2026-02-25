# Mybucks.online Wallet Private Key Generation

This repository showcases the process of **generating a private key** used in the [**mybucks.online**](https://mybucks.online) wallet.

## mybucks.online

[Mybucks.online](https://mybucks.online) is a **seedless, disposable crypto wallet** designed for **speed and convenience**. It generates a private key from your **passphrase and PIN** using an industry-standard, verified **one-way hash function**. Your private key forms your account, allowing you to transfer, receive, and hold your crypto assets instantly.

As a hash function, the **Scrypt** Key Derivation Function (KDF) increases the computational effort required to crack credentials, effectively delaying **brute-force** attacks and making them impractical.

It fully runs on your **browser side** without using any storage or invoking any 3rd-party APIs for key management. It instantly generates your private key from your credentials input, and whenever you close or refresh, there is **no footprint**. This absolutely protects your privacy.

## User Input
The application receives two inputs from the user:

- Passphrase
- PIN

## Key Generation Process
The private key is generated using the following cryptographic functions:

- Scrypt
- keccak256


Please check `index.js` in this repository for the implementation details.<br/>
For more details, please refer to [this documentation](https://docs.mybucks.online/concept/how-it-works).

## How to run

```
npm install
npm start
```
