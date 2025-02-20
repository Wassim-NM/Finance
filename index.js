const API_BASE_URLS = {
    AlphaVantage: "GET https://www.alphavantage.co/query?",
    Binance: "https://api.binance.com/api/v3/",
    CoinCap: "https://api.coincap.io/v2/",
    CoinGecko: "https://api.coingecko.com/api/v3/",
    CoinMarketCap: "https://pro-api.coinmarketcap.com/v1/",
    CryptoCompare: "GET https://min-api.cryptocompare.com/data/",
    // Glassnode: "GET https://api.glassnode.com/v1/",
    Kraken: "https://api.kraken.com/0/public/"
    // Nomics: "GET https://api.nomics.com/v1/"
};

console.log("Available Crypto API Base URLs:", API_BASE_URLS);

const ApiKeys = {
    AlphaVantageKey: "N1B5BHY0SFWUTCU8",
    // BinanceKey: , //No API Key Are Requierd
    CoinCapKey: "21b919f5-ac64-491f-86bc-ea2a83692162",
    CoinGeckoKey: "CG-5anBuXGszef4URj7vpqhX3WX",
    CoinMarketCapKey: "f3592c62-6838-4185-9381-02b6de69e31f",
    CryptoCompareKey: "68b80e40cee422da411e7e602a225ae15d3e7cebae5f5f310be2776e4756af1c"
    // GlassnodeKey: , //No Accsess
    // KrakenKey: , // No API Key Are Requierd
    // NomicsKey: , // Closed
}

// Function to fetch data from CoinGecko
async function fetchCoinGecko(CoinGeckoKey) {
    try {
        const response = await fetch(API_BASE_URLS.CoinGecko);
        const data = await response.json();
        console.log('CoinGecko Data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching CoinGecko data:', error);
    }
}

// Function to fetch data from CoinMarketCap
async function fetchCoinMarketCap(CoinMarketCapKey) {
    // const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=10&convert=USD';
    try {
        const response = await fetch(API_BASE_URLS.CoinMarketCap, {
            method: 'GET',
            headers: {
                'X-CMC_PRO_API_KEY': CoinMarketCapKey,
            },
        });
        const data = await response.json();
        console.log('CoinMarketCap Data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching CoinMarketCap data:', error);
    }
}

// Function to fetch data from CryptoCompare
async function fetchCryptoCompare(CryptoCompareKey) {
    // const url = 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD';
    try {
        const response = await fetch(API_BASE_URLS.CryptoCompare);
        const data = await response.json();
        console.log('CryptoCompare Data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching CryptoCompare data:', error);
    }
}

// Function to fetch data from Nomics // No responce
// async function fetchNomics(apiKey) {
//     const url = `https://api.nomics.com/v1/prices?key=${apiKey}`;
//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         console.log('Nomics Data:', data);
//         return data;
//     } catch (error) {
//         console.error('Error fetching Nomics data:', error);
//     }
// }

// Function to fetch data from Binance
async function fetchBinance() {
    // const url = 'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT';
    try {
        const response = await fetch(API_BASE_URLS.Binance);
        const data = await response.json();
        console.log('Binance Data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching Binance data:', error);
    }
}

// Function to fetch data from Kraken
async function fetchKraken() {
    // const url = 'https://api.kraken.com/0/public/Ticker?pair=XBTUSD';
    try {
        const response = await fetch(API_BASE_URLS.Kraken);
        const data = await response.json();
        console.log('Kraken Data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching Kraken data:', error);
    }
}

// Function to fetch data from Alpha Vantage
async function fetchAlphaVantage(AlphaVantageKey) {
    // const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=USD&apikey=${apiKey}`;
    try {
        const response = await fetch(API_BASE_URLS.AlphaVantage);
        const data = await response.json();
        console.log('Alpha Vantage Data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching Alpha Vantage data:', error);
    }
}

// Function to fetch data from Glassnode // No Access
// async function fetchGlassnode(apiKey) {
//     const url = `https://api.glassnode.com/v1/metrics/indicators/sopr?a=btc&api_key=${apiKey}`;
//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         console.log('Glassnode Data:', data);
//         return data;
//     } catch (error) {
//         console.error('Error fetching Glassnode data:', error);
//     }
// }

// Main function to fetch all APIs in parallel
async function fetchAllCryptoData() {
    try {
        // Fetch all APIs in parallel using Promise.all
        const [
            coingeckoData,
            coinMarketCapData,
            cryptocompareData,
            binanceData,
            krakenData,
            alphaVantageData
        ] = await Promise.all([
            fetchCoinGecko(CoinGeckoKey),
            fetchCoinMarketCap(CoinMarketCapKey),
            fetchCryptoCompare(CryptoCompareKey),
            fetchBinance(),
            fetchKraken(),
            fetchAlphaVantage(AlphaVantageKey)
        ]);

        // Return or process the data as needed
        return {
            coingeckoData,
            coinMarketCapData,
            cryptocompareData,
            binanceData,
            krakenData,
            alphaVantageData
        };
    } catch (error) {
        console.error('Error fetching data from one or more APIs:', error);
    }
}

// Call the main function
fetchAllCryptoData().then(data => {
    console.log('All Crypto Data:', data);
});