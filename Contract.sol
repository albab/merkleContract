//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Contract is ERC721, Ownable {
    uint256 public constant PUBLIC_SALE_PRICE = 0.1 ether;
    uint256 public constant COMMUNITY_SALE_PRICE = 0.05 ether;
    bytes32 public communitySaleMerkleRoot;
    mapping(address => uint256) public communityMintCounts;
    event NewMint(address, uint256);

    modifier isValidMerkleProof(bytes32[] calldata merkleProof, bytes32 root) {
        require(
            MerkleProof.verify(
                merkleProof,
                root,
                keccak256(abi.encodePacked(msg.sender))
            ),
            "Address does not exist in list"
        );
        _;
    }
    constructor(
    ) ERC721("CONTRACT", "CNTRCT") {
        communitySaleMerkleRoot = 0x36153bdef397ee43029e0e85a49064e503f238a04e5ac831f3e73584e6b9ef8d;
    }

    function mint()
        external
        payable
    {
        uint256 tokenId = nextTokenId();
         _safeMint(msg.sender, tokenId);
         emit NewMint(msg.sender, tokenId);
    }

    function mintCommunitySale(
        bytes32[] calldata merkleProof
    )
        external
        payable
        isValidMerkleProof(merkleProof, communitySaleMerkleRoot)
    {
        uint256 numAlreadyMinted = communityMintCounts[msg.sender];
        communityMintCounts[msg.sender] = numAlreadyMinted + 1;
        uint256 tokenId = nextTokenId();
         _safeMint(msg.sender, tokenId);
         emit NewMint(msg.sender, tokenId);
    }


    function setCommunityListMerkleRoot(bytes32 merkleRoot) external onlyOwner {
        communitySaleMerkleRoot = merkleRoot;
    }
}
