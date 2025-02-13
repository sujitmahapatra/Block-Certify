import React, { useState } from 'react';
import Web3 from 'web3';

const App = () => {
    const [account, setAccount] = useState('');
    const [certificateHash, setCertificateHash] = useState('');
    const [tokenURI, setTokenURI] = useState('');

    const connectWallet = async () => {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0]);
        } else {
            alert('Please install MetaMask!');
        }
    };

    const mintCertificate = async () => {
        try {
            const response = await fetch('http://localhost:5000/mint-certificate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ certificateHash, tokenURI })
            });
            const data = await response.json();
            if (data.success) alert(`NFT Minted! Tx: ${data.txHash}`);
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>Blockchain Certificate System</h2>
            <button onClick={connectWallet}>Connect MetaMask</button>
            <p>Connected Account: {account}</p>
            <input type="text" placeholder="Certificate Hash" onChange={(e) => setCertificateHash(e.target.value)} />
            <input type="text" placeholder="Token URI" onChange={(e) => setTokenURI(e.target.value)} />
            <button onClick={mintCertificate}>Mint Certificate</button>
        </div>
    );
};

export default App;
