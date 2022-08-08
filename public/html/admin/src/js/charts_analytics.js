$(".analytics-mini-chart").each((index, element) => {
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

new Morris.Donut({
  element: 'morris-doughnut-chart',
  data: [
  { label: 'USA', value: 16890 },
  { label: 'U.K', value: 12037 },
  { label: 'Germany', value: 9890 },
  { label: 'France', value: 6725 },
  { label: 'Australia', value: 3821 },
  { label: 'China', value: 1892 },
  ],
  resize: true,
  colors: [colors.color_primary, colors.color_blue, colors.color_warning, colors.facebook, colors.color_bg, colors.color_danger]
});

new Chart($("#visitors-bar-chart")[0].getContext('2d'), {
  type: 'bar',
  data: {
    datasets: [{
      label: 'Visitors',
      data: [16890, 12037, 9890, 6725, 3821, 1892],
      borderColor: colors.color_primary,
      backgroundColor: 'rgba(55, 131, 181, .55)'
    }, {
      label: 'Target',
      data: [15000, 12500, 10000, 5000, 2500, 1000],
      type: 'line',
      borderColor: colors.color_danger,
      backgroundColor: 'rgba(255, 112, 118, .45)'
    }],
    labels: ['USA', 'U.K', 'Germany', 'France', 'Australia', 'China']
  },
  options: {
    maintainAspectRatio: false,
    legend: {
      display: false,
      labels: {
        display: false
      }
    },
  }
});

new Chart($("#analytics-chart")[0].getContext('2d'), {
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
          borderDash: [8, 4]
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