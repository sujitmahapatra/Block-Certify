// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CertificateStorage {
    struct Certificate {
        string hashId;
        address owner;
        uint256 timestamp;
    }

    mapping(string => Certificate) private certificates;

    event CertificateStored(string hashId, address indexed owner, uint256 timestamp);
    event CertificateVerified(string hashId, bool valid);

    // Store Certificate Hash
    function storeCertificate(string memory hashId) external {
        require(bytes(certificates[hashId].hashId).length == 0, "Certificate already stored!");

        certificates[hashId] = Certificate(hashId, msg.sender, block.timestamp);
        emit CertificateStored(hashId, msg.sender, block.timestamp);
    }

    // Verify Certificate Hash
    function verifyCertificate(string memory hashId) external view returns (bool) {
        bool valid = bytes(certificates[hashId].hashId).length > 0;
        emit CertificateVerified(hashId, valid);
        return valid;
    }

    // Get Certificate Details
    function getCertificateDetails(string memory hashId) external view returns (address, uint256) {
        require(bytes(certificates[hashId].hashId).length > 0, "Certificate not found!");
        Certificate memory cert = certificates[hashId];
        return (cert.owner, cert.timestamp);
    }
}
