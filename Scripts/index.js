const form = document.querySelector(".register");
const fName = document.getElementById('Fname');
const lName = document.getElementById('Lname');
const age = document.getElementById('age');
const email = document.getElementById('account');
const password = document.getElementById('password');
const conPass = document.getElementById('con-Password');

const newU = document.getElementById('newUser');
const registration = document.querySelector('.register-container')
const old = document.getElementById('oldUser');
const favChart = document.querySelector('.fav-chart-container');

const register = document.querySelector('.register');
const submit = document.getElementById('submit');
const reset = document.getElementById('reset');
const disName = document.getElementById('dis-name');

// show new user registration form
submit.addEventListener('click', () => {
    // add user to local storage
    if (age.value < 16) {
        alert('You must be 18 or older to register');
        return;
    }if (password.value !== conPass.value) {
        alert('Passwords do not match');
        return;
    }else {
        userInfo = {
            firstName: fName.value,
            lastName: lName.value,
            age: age.value,
            email: email.value,
            password: password.value
        }
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        alert('Registration Successful');
    }
});

// Check if user is already registered
if(localStorage.getItem('userInfo') != null) {
    registration.classList.add('hide');
    newU.classList.add('hide');
    const welcome = document.querySelector('.welcome');
    welcome.classList.add('hide');
    favChart.classList.remove('hide');
    old.classList.remove('hide');
}

// show user's name
disName.innerHTML = JSON.parse(localStorage.getItem('userInfo')).firstName;

// Rest form

reset.addEventListener('click', () => {
    form.reset();
}
);

// Carosel functionality

let currentIndex = 0;
const slides = document.querySelector('.slides');
const indicators = document.querySelectorAll('.indicator');

function moveSlide(direction) {
  const totalSlides = document.querySelectorAll('.slide').length;
  currentIndex += direction;

  if (currentIndex >= totalSlides) {
    currentIndex = 0;
  } else if (currentIndex < 0) {
    currentIndex = totalSlides - 1;
  }

  updateCarousel();
}

function goToSlide(index) {
  currentIndex = index;
  updateCarousel();
}

function updateCarousel() {
  const slideWidth = document.querySelector('.slide').clientWidth;
  slides.style.transform = `translateX(${-currentIndex * slideWidth}px)`;

  // Update indicators

  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentIndex);
  });
}

// Initialize the carousel

updateCarousel();


// Fetch API Keys
let cryptRating = {
    cryptoRating: function (crypto) {
        fetch(API_BASE_URLS.CoinCap + crypto)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.error(error));
    
}};

// // Function to fetch data from CoinGecko
// async function fetchCoinGecko(CoinGeckoKey) {
//     try {
//         const response = await fetch(API_BASE_URLS.CoinGecko);
//         const data = await response.json();
//         console.log('CoinGecko Data:', data);
//         return data;
//     } catch (error) {
//         console.error('Error fetching CoinGecko data:', error);
//     }
// }

// // Function to fetch data from CoinMarketCap
// async function fetchCoinMarketCap(CoinMarketCapKey) {
//     // const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=10&convert=USD';
//     try {
//         const response = await fetch(API_BASE_URLS.CoinMarketCap, {
//             method: 'GET',
//             headers: {
//                 'X-CMC_PRO_API_KEY': CoinMarketCapKey,
//             },
//         });
//         const data = await response.json();
//         console.log('CoinMarketCap Data:', data);
//         return data;
//     } catch (error) {
//         console.error('Error fetching CoinMarketCap data:', error);
//     }
// }

// // Function to fetch data from CryptoCompare

// async function fetchCryptoCompare(CryptoCompareKey) {
//     // const url = 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD';
//     try {
//         const response = await fetch(API_BASE_URLS.CryptoCompare);
//         const data = await response.json();
//         console.log('CryptoCompare Data:', data);
//         return data;
//     } catch (error) {
//         console.error('Error fetching CryptoCompare data:', error);
//     }
// }

// // Function to fetch data from Binance

// async function fetchBinance() {
//     // const url = 'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT';
//     try {
//         const response = await fetch(API_BASE_URLS.Binance);
//         const data = await response.json();
//         console.log('Binance Data:', data);
//         return data;
//     } catch (error) {
//         console.error('Error fetching Binance data:', error);
//     }
// }

// // Function to fetch data from Kraken

// async function fetchKraken() {
//     // const url = 'https://api.kraken.com/0/public/Ticker?pair=XBTUSD';
//     try {
//         const response = await fetch(API_BASE_URLS.Kraken);
//         const data = await response.json();
//         console.log('Kraken Data:', data);
//         return data;
//     } catch (error) {
//         console.error('Error fetching Kraken data:', error);
//     }
// }

// // Function to fetch data from Alpha Vantage

// async function fetchAlphaVantage(AlphaVantageKey) {
//     // const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=USD&apikey=${apiKey}`;
//     try {
//         const response = await fetch(API_BASE_URLS.AlphaVantage);
//         const data = await response.json();
//         console.log('Alpha Vantage Data:', data);
//         return data;
//     } catch (error) {
//         console.error('Error fetching Alpha Vantage data:', error);
//     }
// }

// // Main function to fetch all APIs in parallel

// async function fetchAllCryptoData() {
//     try {
//         // Fetch all APIs in parallel using Promise.all

//         const [
//             coingeckoData,
//             coinMarketCapData,
//             cryptocompareData,
//             binanceData,
//             krakenData,
//             alphaVantageData
//         ] = await Promise.all([
//             fetchCoinGecko(CoinGeckoKey),
//             fetchCoinMarketCap(CoinMarketCapKey),
//             fetchCryptoCompare(CryptoCompareKey),
//             fetchBinance(),
//             fetchKraken(),
//             fetchAlphaVantage(AlphaVantageKey)
//         ]);

//         // Return or process the data as needed

//         return {
//             coingeckoData,
//             coinMarketCapData,
//             cryptocompareData,
//             binanceData,
//             krakenData,
//             alphaVantageData
//         };
//     } catch (error) {
//         console.error('Error fetching data from one or more APIs:', error);
//     }
// }

// // Call the main function

// fetchAllCryptoData().then(data => {
//     console.log('All Crypto Data:', data);
// });