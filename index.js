function initChart() {
  var myChart = new Chart(document.getElementById("myChart"), config);
  return myChart;
}
const percentageGrowth = [];
const labels = [];
let length = 0;
const balance = 1000;

const tradeResult = [
  {
    pair: "EURUSD",
    profit: 12,
    date: "9/25/2021",
  },
  {
    pair: "EURUSD",
    profit: 3,
    date: "9/26/2021",
  },
  {
    pair: "EURUSD",
    profit: -4,
    date: "9/26/2021",
  },
  {
    pair: "EURUSD",
    profit: 4,
    date: "9/26/2021",
  },
  {
    pair: "EURUSD",
    profit: -6,
    date: "9/26/2021",
  },
  {
    pair: "EURUSD",
    profit: 6,
    date: "9/26/2021",
  },
];

tradeResult.reduce((acc, curr) => {
  // percentageGrowth.push(acc + curr.profit);
  return acc + curr.profit;
}, 0);

tradeResult.forEach((_, index) => {
  console.log((_.profit / balance) * 100);
  percentageGrowth.push((_.profit / balance) * 100);
  labels.push(index);
});
console.log(Math.min(...percentageGrowth)); // lowest value

const data = {
  labels: labels,
  datasets: [
    {
      label: "30 years data",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      borderWidth: 1,
      radius: 1,
      data: percentageGrowth,
      // data: tradeResult.map((i) => i.profit),
      // data: [
      //   4861, 7022, 3426, 5020, 6394, 5043, 4861, 7022, 4888, 3020, 6394, 7022,
      //   3326, 8000,
      // ],
    },
  ],
};

const DISPLAY = false;
const config = {
  type: "line",
  data: data,
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Equity Curve",
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Trades",
        },
        grid: {
          display: DISPLAY,
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Percentage Growth (%)",
        },
      },
    },
    animations: {
      y: {
        easing: "easeInOutElastic",
        from: (ctx) => {
          if (ctx.type === "data") {
            if (ctx.mode === "default" && !ctx.dropped) {
              ctx.dropped = true;
              return 0;
            }
          }
        },
      },
    },
  },
};

var myChart = new Chart(document.getElementById("myChart"), config);

function addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(data);
  });
  chart.update();
}

document.querySelector(".btn-secondary").addEventListener("click", () => {
  const tempLength = tradeResult.reduce((acc, curr) => {
    return acc + curr.profit;
  }, 0);
  length = tempLength + 2;
  tradeResult.push({
    pair: "EURUSD",
    profit: length,
    date: "9/26/2021",
  });
  console.log(tradeResult);
  addData(
    myChart,
    labels.length - 1 + 1,
    tradeResult[tradeResult.length - 1].profit
  );
});
