// Helper functions
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

new Chart($("#retail-revenue-chart")[0].getContext('2d'), {
  type: 'line',
  data: {
    labels:
    [
    "01", "02", "03", "04",
    "05", "06", "07", "08",
    "09", "10", "11", "12",
    "13"
    ],
    datasets: [
    {
      label: 'Revenue',
      data: [14850, 10920, 11000, 8950, 5000, 6100, 8000, 4000, 15000, 26800, 12100, 13000, 24050],
      borderWidth: 2,
      borderColor: colors.color_primary,
      backgroundColor: colors.color_bg,
      pointBackgroundColor: colors.color_primary
    }
    ]
  },
  options: {
    maintainAspectRatio: false,
    legend: {
      display: false,
      labels: { display: false }
    },
    tooltips: {
      mode: 'index',
      callbacks: {
        footer: function(tooltipItems, data) {
          var sum = 0;
          tooltipItems.forEach(function(tooltipItem) {
            sum += data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          });
          return 'Sum: ' + sum;
        },
      },
      footerFontStyle: 'normal'
    },
    scales: {
      yAxes: [{
        stacked: true,
        gridLines: {
          color: colors.border_color,
          zeroLineColor: colors.border_color,
        },
        ticks: {
         callback: function(value, index, values) {
          if(parseInt(value) >= 1000){
            return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          } else {
            return '$' + value;
          }
        }
      }
    }],
    xAxes: [{
      gridLines : {
        display : false
      },
      border: {
        display: true,
        color: colors.border_color,
      },
      ticks: {
        beginAtZero: true
      }
    }]
  }
}
});

new Chart($("#retail-sales-chart")[0].getContext('2d'), {
  type: 'line',
  data: {
    labels:
    [
    "01", "02", "03", "04",
    "05", "06", "07", "08",
    "09", "10", "11", "12",
    "13"
    ],
    datasets: [
    {
      label: 'Sales',
      data: [2000, 1000, 2000, 4000, 5000, 6000, 8000, 4000, 5000, 6000, 2000, 3000, 4000],
      borderWidth: 2,
      borderColor: colors.color_primary,
      backgroundColor: colors.color_bg,
      pointBackgroundColor: colors.color_primary
    }
    ]
  },
  options: {
    maintainAspectRatio: false,
    legend: {
      display: false,
      labels: { display: false }
    },
    tooltips: {
      mode: 'index',
      callbacks: {
        footer: function(tooltipItems, data) {
          var sum = 0;
          tooltipItems.forEach(function(tooltipItem) {
            sum += data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          });
          return 'Sum: ' + sum;
        },
      },
      footerFontStyle: 'normal'
    },
    scales: {
      yAxes: [{
        stacked: true,
        gridLines: {
          color: colors.border_color,
          zeroLineColor: colors.border_color,
        },
        ticks: {
         callback: function(value, index, values) {
          if(parseInt(value) >= 1000){
            return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          } else {
            return '$' + value;
          }
        }
      }
    }],
    xAxes: [{
      gridLines : {
        display : false
      },
      border: {
        display: true,
        color: colors.border_color,
      },
      ticks: {
        beginAtZero: true
      }
    }]
  }
}
});

$(".retail-views-mini-chart").each((index, element) => {
  let ctx = element.getContext('2d')
  let values = []
  for (var i = 6; i >= 0; i--) {
    values.push(getRandomInt(150, 200))
  }

  new Chart(ctx, {
  type: 'line',
  data: {
    labels:
    [
    "01", "02", "03", "04",
    "05", "06"
    ],
    datasets: [
    {
      label: 'Sales',
      data: values,
      borderWidth: 2,
      borderColor: colors.color_primary,
      backgroundColor: colors.color_bg,
      pointBackgroundColor: colors.color_primary
    }
    ]
  },
  options: {
    elements: { point: { radius: 0 } },
    maintainAspectRatio: false,
    legend: {
      display: false,
      labels: { display: false }
    },
    tooltips: {
      enabled: false
    },
    scales: {
      yAxes: [{
        gridLines: {
          display: false,
          zeroLineColor: colors.border_color,
          drawBorder: false
        },
        ticks: {
          display: false
        }
    }],
    xAxes: [{
      gridLines : {
        display : false,
        drawBorder: false
      },
      ticks: {
        display: false
      }
    }]
  }
}
});
})