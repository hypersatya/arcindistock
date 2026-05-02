let provider;
let signer;

const connectBtn = document.getElementById('connectBtn');
const statusText = document.getElementById('walletStatus');

const connectWallet = async () => {
    // 1. Check if Mobile or Desktop
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            const address = accounts[0];
            
            // UI Updates
            statusText.innerText = `Connected: ${address.substring(0, 6)}...${address.substring(38)}`;
            connectBtn.innerText = "Connected ✅";
            console.log("Connected to:", address);
            
        } catch (error) {
            console.error("User denied account access", error);
        }
    } else {
        // 2. Mobile Deep Link (Agar wallet nahi hai toh Metamask app khulega)
        const dappUrl = window.location.href.split('//')[1];
        const metamaskAppDeepLink = "https://metamask.app.link/dapp/" + dappUrl;
        window.open(metamaskAppDeepLink, '_blank');
    }
};

// Simple Chart logic (Same as before)
const initChart = () => {
    const ctx = document.getElementById('stockChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['10am', '11am', '12pm', '1pm', '2pm', '3pm'],
            datasets: [{
                label: 'Price',
                data: [148, 152, 150, 155, 153, 154.20],
                borderColor: '#38bdf8',
                tension: 0.4
            }]
        },
        options: { responsive: true }
    });
};

connectBtn.addEventListener('click', connectWallet);
window.onload = initChart;
