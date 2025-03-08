// APIs & Calls

const API_BASE_URLS = {
  AlphaVantage: "https://www.alphavantage.co/query?",
  // Binance: "https://www.binanceapis.com/oauth-api/v1/revoke-token",
  CoinCap: "https://api.coincap.io/v2/assets",
  CoinGecko: "https://api.coingecko.com/api/v3/",
  CoinMarketCap: "https://pro-api.coinmarketcap.com/v1/",
  CryptoCompare: "https://min-api.cryptocompare.com/data/",
  Kraken: "https://api.kraken.com/0/public/"
};

const ApiKeys = {
  AlphaVantageKey: "WMXZSPSOE58L8LLM",
  // BinanceKey: , //No API Key Are Requierd
  CoinCapKey: "21b919f5-ac64-491f-86bc-ea2a83692162",
  CoinGeckoKey: "CG-5anBuXGszef4URj7vpqhX3WX",
  // CoinMarketCapKey: "f3592c62-6838-4185-9381-02b6de69e31f",
  CryptoCompareKey: "68b80e40cee422da411e7e602a225ae15d3e7cebae5f5f310be2776e4756af1c"
  // KrakenKey: , // No API Key Are Requierd
}

// Function to fetch data from CoinCap

// async function fetchCoinCap(CoinCapKey) {
//   const url = API_BASE_URLS.CoinCap + '?apiKey=' + CoinCapKey;
//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log('CoinCap Data:', data);
//     return data;
//   } catch (error) {
//     console.error('Error fetching CoinCap data:', error);
//   }
// }

// Function to fetch data from CoinGecko

async function fetchCoinGecko(CoinGeckoKey) {
  const url = API_BASE_URLS.CoinGecko + 'coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    console.log('CoinGecko Data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching CoinGecko data:', error);
  }
}

// Function to fetch data from CoinMarketCap

// async function fetchCoinMarketCap(CoinMarketCapKey) {
//   const url = API_BASE_URLS.CoinMarketCap + 'cryptocurrency/listings/latest' + '?apiKey=' + CoinMarketCapKey;
//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log('CoinMarketCap Data:', data);
//     return data;
//   } catch (error) {
//     console.error('Error fetching CoinMarketCap data:', error);
//   }
// }

// Function to fetch data from CryptoCompare

async function fetchCryptoCompare(CryptoCompareKey) {
  try {
    const response = await fetch(API_BASE_URLS.CryptoCompare + 'price?fsym=BTC&tsyms=USDT,LBP' + '?apiKey=' + CryptoCompareKey);
    const data = await response.json();
    console.log('CryptoCompare Data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching CryptoCompare data:', error);
  }
}

// Function to fetch data from AlphaVantage

// async function fetchAlphaVantage(AlphaVantageKey) {
//   const url = API_BASE_URLS.AlphaVantage + 'function=TIME_SERIES_INTRADAY&symbol=' + 'BTC' + '&interval=5min&apikey=' + ApiKeys.AlphaVantageKey;
//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log('AlphaVantage Data:', data);
//     return data;
//   } catch (error) {
//     console.error('Error fetching AlphaVantage data:', error);
//   }
// }

// Function to fetch data from Binance

// async function fetchBinance() {
//   const url = `${API_BASE_URLS.Binance}`;
//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log('Binance Data:', data);
//     return data;
//   } catch (error) {
//     console.error('Error fetching Binance data:', error);
//   }
// }

// Function to fetch data from Kraken

async function fetchKraken() {
  try {
    const response = await fetch(API_BASE_URLS.Kraken + 'Ticker?pair=' + 'BTCUSD');
    const data = await response.json();
    console.log('Kraken Data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching Kraken data:', error);
  }
}

// Main function to fetch all APIs in parallel

async function fetchAllCryptoData() {
  try {
    // Fetch all APIs in parallel using Promise.all

    const [
      coingeckoData,
      // coinCapData,
      // coinMarketCapData,
      cryptocompareData,
      // binanceData,
      krakenData,
      // alphaVantageData
    ] = await Promise.all([
      fetchCoinGecko(ApiKeys.CoinGeckoKey),
      // fetchCoinCap(ApiKeys.CoinCapKey),
      // fetchCoinMarketCap(ApiKeys.CoinMarketCapKey),
      fetchCryptoCompare(ApiKeys.CryptoCompareKey),
      // fetchBinance(),
      fetchKraken(),
      // fetchAlphaVantage(ApiKeys.AlphaVantageKey)
    ]);

    // Return or process the data as needed

    return {
      coingeckoData,
      // coinCapData,
      // coinMarketCapData,
      cryptocompareData,
      // binanceData,
      // krakenData,
      // alphaVantageData
    };
  } catch (error) {
    console.error('Error fetching data from one or more APIs:', error);
  }
}

fetchAllCryptoData();

// Append the data in the table

const tableBodyContainer = document.getElementById('tableBody');

async function appendData() {
  const data = await fetchAllCryptoData();
  const cryptoData = data.coingeckoData;
  for (let i = 0; i < 5; i++) {

    let nRow = document.createElement('tr');
    let nRank = document.createElement('td');
    let nName = document.createElement('td');
    let nSymbol = document.createElement('td');
    let nPrice = document.createElement('td');
    let nMarketCap = document.createElement('td');
    let nPercentages = document.createElement('td');

    nRank.innerHTML = cryptoData[i].market_cap_rank;
    nName.innerHTML = cryptoData[i].name;
    nSymbol.innerHTML = cryptoData[i].symbol;
    nPrice.innerHTML = cryptoData[i].current_price;
    nMarketCap.innerHTML = cryptoData[i].market_cap;
    nPercentages.innerHTML = cryptoData[i].price_change_percentage_24h + ' %';

    nRank.id='rank-' + i;
    nName.id='name-' + i;
    nSymbol.id='symbol-' + i;
    nPrice.id='price-' + i;
    nMarketCap.id='marketCap-' + i;
    nPercentages.id='percentages-' + i;

    nRow.appendChild(nRank);
    nRow.appendChild(nName);
    nRow.appendChild(nSymbol);
    nRow.appendChild(nPrice);
    nRow.appendChild(nMarketCap);
    nRow.appendChild(nPercentages);

    tableBodyContainer.appendChild(nRow);
  }
}

appendData();

// Data for the chart

const cryptoData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Bitcoin Price (USD)',
      data: [27000, 28000, 29000, 30000, 31000, 32000],
      borderColor: '#FF9800',
      backgroundColor: 'rgba(255, 152, 0, 0.2)',
      borderWidth: 2,
      fill: true,
    },
    {
      label: 'Ethereum Price (USD)',
      data: [1800, 1900, 2000, 2100, 2200, 2300],
      borderColor: '#2196F3',
      backgroundColor: 'rgba(33, 150, 243, 0.2)',
      borderWidth: 2,
      fill: true,
    },
  ],
};

// Chart Configuration
const config = {
  type: 'line',
  data: cryptoData,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: false,
      },
    },
  },
};

// Initialize the Chart
const ctx = document.getElementById('cryptoChart').getContext('2d');
new Chart(ctx, config);