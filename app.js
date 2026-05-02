let provider;
let signer;

// 1. Chart Initialization
const initChart = () => {
    const ctx = document.getElementById('stockChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['10am', '11am', '12pm', '1pm', '2pm', '3pm'],
            datasets: [{
                label: 'Stock Price',
                data: [148, 152, 150, 155, 153, 154.20],
                borderColor: '#38bdf8',
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                y: { grid: { color: '#1e293b' }, ticks: { color: '#94a3b8' } },
                x: { grid: { color: '#1e293b' }, ticks: { color: '#94a3b8' } }
            }
        }
    });
};

// 2. Connect Wallet Function
const connectWallet = async () => {
    if (window.ethereum) {
        try {
            provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            signer = provider.getSigner();
            const address = await signer.getAddress();
            
            document.getElementById('walletStatus').innerText = `Address: ${address.slice(0,6)}...${address.slice(-4)}`;
            document.getElementById('connectBtn').innerText = "Connected";
            document.getElementById('connectBtn').style.background = "#1e293b";
            document.getElementById('connectBtn').style.color = "#38bdf8";
        } catch (err) {
            console.error("User rejected connection");
        }
    } else {
        alert("MetaMask install karein!");
    }
};

// 3. Trade Action
const handleTrade = async () => {
    const amount = document.getElementById('tradeAmt').value;
    
    if (!signer) {
        alert("Pehle Wallet connect karein!");
        return;
    }
    
    if (!amount || amount <= 0) {
        alert("Sahi amount daalein!");
        return;
    }

    // Arc Testnet simulation message
    alert(`Order Sent!\nBuying ${amount} units on Arc Network Testnet.\nCheck MetaMask for confirmation.`);
    
    /* FUTURE ARC INTEGRATION:
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    await contract.buyStock(amount);
    */
};

// Event Listeners
document.getElementById('connectBtn').addEventListener('click', connectWallet);
document.getElementById('buyAction').addEventListener('click', handleTrade);

// Run on Load
window.onload = initChart;
