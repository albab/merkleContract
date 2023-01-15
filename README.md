merkle contract
===============

This repo contains examples for how to implement a merkle tree in a smart contract.

_Note: these are only bare-bone examples; cherry pick what you need and use at your own risk_

The main crux of `Contract.sol` is showing how to set the root of the merkle tree inside a contract, how to set it once deployed via the setCommunityListMerkleRoot() function, and how to check if a merkle proof is valid via the isValidMerkleProof() function.

The `test.js` file contains a couple examples for how to check if these methods are working properly or not.

For info on how to generate merkle proofs, see my [merkle tree server repo](https://github.com/albab/merkleServer)