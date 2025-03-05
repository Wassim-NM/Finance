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