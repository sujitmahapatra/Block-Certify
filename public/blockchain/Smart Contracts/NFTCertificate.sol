// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NFTCertificate is ERC721URIStorage, Ownable {
    uint256 private _tokenIds;
    mapping(string => bool) private existingHashes; // Prevent duplicate hashes
    mapping(uint256 => string) private certificateHashes; // Link tokenId to SHA256 Hash

    constructor() ERC721("BlockCertifyNFT", "BCERT") {}

    // Mint NFT for Certificate
    function mintCertificate(string memory certificateHash, string memory tokenURI) external onlyOwner returns (uint256) {
        require(!existingHashes[certificateHash], "Certificate already exists!");

        _tokenIds++;
        uint256 newItemId = _tokenIds;

        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        existingHashes[certificateHash] = true;
        certificateHashes[newItemId] = certificateHash;

        return newItemId;
    }

    // Retrieve Certificate Hash by Token ID
    function getCertificateHash(uint256 tokenId) external view returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return certificateHashes[tokenId];
    }

    // Check if a certificate hash exists
    function isCertificateStored(string memory hashId) external view returns (bool) {
        return existingHashes[hashId];
    }
}
