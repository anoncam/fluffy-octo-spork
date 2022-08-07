// Helper Functions
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

$('.doughnut-chart').each((index, element) => {
  let ctx = element.getContext('2d')
  let value1 = element.dataset.percent
  let value2 = 100 - value1
  let pie_color = ''

  switch(true) {
    case value1 <= 25:
    pie_color = colors.color_danger
    break;
    case value1 <= 50:
    pie_color = colors.color_warning
    break;
    default:
    pie_color = colors.color_success
  }

  new Chart(ctx, {
    type: 'pie',
    data: {
      datasets: [{
        data: [value1, value2],
        borderWidth: 1,
        backgroundColor: [pie_color, colors.color_bg]
      }]
    },
    options: {
      tooltips: { enabled: false },
      cutoutPercentage: 85
    }
  })
});

$('.stats-chart').each((index, element) => {
  let ctx = element.getContext('2d')
  let stats_data = []

  for (var i = 6; i >= 0; i--) {
    stats_data.push(getRandomInt(100, 300));
  }

  new Chart(ctx, {
    type: 'line',
    data: {
      labels:
      [
      "01", "02", "03", "04",
      "05", "06", "07", "08"
      ],
      datasets: [{
        data: stats_data,
        borderWidth: 2,
        borderColor: colors.color_primary,
        backgroundColor: 'rgba(103, 116, 223,.12)',
        pointBackgroundColor: colors.color_primary
      }]
    },
    options: {
      elements: { point: { radius: 0 } },
      tooltips: {
        enabled: false
      },
      legend: {
        display: false,
        labels: { display: false }
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: false,
            zeroLineColor: colors.border_color
          },
          ticks: {
            display: false
          }
        }],
        yAxes: [{
          gridLines: {
            display: false,
            zeroLineColor: colors.border_color
          },
          ticks: {
            display: false
          }
        }]
      }
    }
  });
});

if ($("#visitors-chart").length) {
  new Chart($('#visitors-chart'), {
    type: 'pie',
    data: {
      datasets: [{
        data: [12, 30, 15, 13, 20, 10],
        borderWidth: 1,
        backgroundColor: [colors.color_bg, colors.color_primary, colors.color_warning, colors.color_danger, colors.color_blue, colors.color_success]
      }]
    },
    options: {
      tooltips: { enabled: true },
      cutoutPercentage: 40,
      events: false,
      animation: {
        duration: 500,
        easing: "easeOutQuart",
        onComplete: function () {
          var ctx = this.chart.ctx;
          ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';

          this.data.datasets.forEach(function (dataset) {

            for (var i = 0; i < dataset.data.length; i++) {
              var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
              total = dataset._meta[Object.keys(dataset._meta)[0]].total,
              mid_radius = model.innerRadius + (model.outerRadius - model.innerRadius)/2,
              start_angle = model.startAngle,
              end_angle = model.endAngle,
              mid_angle = start_angle + (end_angle - start_angle)/2;

              var x = mid_radius * Math.cos(mid_angle);
              var y = mid_radius * Math.sin(mid_angle);

              ctx.fillStyle = '#fff';
              if (i == 0){
                ctx.fillStyle = '#444';
              }
              var percent = String(Math.round(dataset.data[i]/total*100)) + "%";

          // Display percent in another line, line break doesn't work for fillText
          ctx.fillText(percent, model.x + x, model.y + y + 10);
        }
      });
        }
      }
    }
  });
}

if ($("#visitors-chart").length || $("#members-chart").length) {
  new Chart($("#members-chart")[0].getContext('2d'), {
    type: 'bar',
    data: {
      labels:
      [
      "01", "02", "03", "04",
      "05", "06", "07", "08",
      "09", "10", "11", "12"
      ],
      datasets: [
      {
        label: 'Sales',
        data: [401, 362, 210, 85, 105, 125, 90, 150, 540, 980, 1102, 1150],
        borderWidth: 5,
        borderColor: colors.color_primary,
        backgroundColor: colors.color_primary,
      }
      ]
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false,
        labels: {
          display: false
        }
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
      xAxes : [ {
        gridLines : {
          display : false
        }
      } ]
    }
  }
});
}

new Chart($("#dashboard-chart")[0].getContext('2d'), {
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