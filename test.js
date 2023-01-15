const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Contract", function () {
  let Contract;
  let contract;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function() {
      Contract = await ethers.getContractFactory("Contract");
      [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
      contract = await Contract.deploy();
  });

  describe("Merkle Proof", function () {
    it("Should be able to set community sale merkle root", async function () {
      const merkleRoot = "0x36153bdef397ee43029e0e85a49064e503f238a04e5ac831f3e73584e6b9ef8d";
      await expect(contract.setCommunityListMerkleRoot(merkleRoot));
      const communityMerkleRoot = await contract.communitySaleMerkleRoot();
      console.log("communityMerkleRoot", communityMerkleRoot);
      expect(communityMerkleRoot).to.equal(merkleRoot);
    });
  });
  describe("Minting community sale", function () {
    it("Should be able to mint pass with 0.05Ξ", async function () {
      const merkleProof = [
        "0x864e2f2884ca0628b36ce8f7c71d6f54ceaf71a644ac74ccb173cd02d1cf8c4b",
        "0xc12cd6788427b1c263656747a1a6bc9ce6ed800626f16e0c1f7273073e4ef642",
        "0xa438b1b0f5c2d9954b773eba78b51742ecf1c1a0eca3839fce4cde6880b98c7d",
        "0x093040fd56b637a8f832c1cbabc97534ff8f194aed41647b95a36c033555239e",
        "0x288f2ca2c525ef04beff8f23cd98c8f139165a977bf68fde4c714e78fe7c6da6",
        "0x20aa78914c8202b2f1282474a4bc29a32c620ef13d08685e0b9b4e1dec49517c",
        "0x7ac233d55e5c686f05de71889bdedc477aec284af88f8245c5262b0f32316651",
        "0x1b9483424b9f1bb9ad5b69981382fc7c4de5c10e738df79f4b6d9f895a179e0c",
        "0xe72cf8ca7e022b4aefaa64c092798d19ca7397d0d9e6804a82737026eff61d93"
      ];

      await expect(contract.connect(addr1).mintCommunitySale(merkleProof, { value: ethers.utils.parseEther("0.05")}))
        .to.emit(contract, "NewMint")
        .withArgs(addr1.address, 1);
    });
  });
});

