// Connect Web3 with Metamask
let web3;
let account;
let contract;
const CONTRACT_ADDRESS = " 0x379c8badeabbeec03e50f475fc4846f65e3ec34b"; // Replace with actual address
const ABI = [ /* ABI array copied from compiled contract */ ];

window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.enable(); // Request access
        const accounts = await web3.eth.getAccounts();
        account = accounts[0];
        contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

        console.log("Connected account:", account);
    } else {
        alert('Please install MetaMask!');
    }
});

// List NFT
async function listNFT(nftAddress, tokenId, priceInEther) {
    const price = web3.utils.toWei(priceInEther, 'ether');
    await contract.methods.listNFT(nftAddress, tokenId, price)
        .send({ from: account });
    alert('NFT listed!');
}

// Cancel listing
async function cancelListing(nftAddress, tokenId) {
    await contract.methods.cancelListing(nftAddress, tokenId)
        .send({ from: account });
    alert('Listing cancelled!');
}

// Purchase NFT
async function purchaseNFT(nftAddress, tokenId) {
    const listing = await contract.methods.getListing(nftAddress, tokenId).call();
    await contract.methods.purchaseNFT(nftAddress, tokenId)
        .send({ from: account, value: listing.price });
    alert('NFT purchased!');
}

// Update listing price
async function updatePrice(nftAddress,
