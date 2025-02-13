require('dotenv').config();
const express = require('express');
const Web3 = require('web3');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL));

const nftContractABI = JSON.parse(fs.readFileSync('NFTCertificateABI.json', 'utf-8'));
const nftContractAddress = process.env.NFT_CONTRACT_ADDRESS;
const nftContract = new web3.eth.Contract(nftContractABI, nftContractAddress);

app.post('/mint-certificate', async (req, res) => {
    const { certificateHash, tokenURI } = req.body;
    try {
        const accounts = await web3.eth.getAccounts();
        const receipt = await nftContract.methods.mintCertificate(certificateHash, tokenURI).send({ from: accounts[0] });
        res.json({ success: true, txHash: receipt.transactionHash });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
