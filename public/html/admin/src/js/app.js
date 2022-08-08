$(() => { $('[data-toggle="tooltip"]').tooltip({ container: 'body' }) });
$(() => { $('[data-toggle="popover"]').popover() });

$('.dropdown.notifications ul a.nav-link').click(function (e) {
  e.stopPropagation();
  $(this).tab('show');
});

if (document.getElementById('financial-sales')) {
  new Chart($("#financial-sales")[0].getContext('2d'), {
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
        label: 'Invoices',
        data: [2000, 1000, 2000, 4000, 5000, 6000, 8000, 4000, 5000, 6000, 2000, 3000, 4000],
        borderWidth: 2,
        borderColor: colors.color_primary,
        backgroundColor: colors.color_bg,
        pointBackgroundColor: colors.color_primary
      },
      {
        label: 'Earnings',
        data: [1242, 4432, 1331, 1222, 3433, 6332, 2211, 2453, 5431, 1213, 4222, 4000, 5000],
        borderWidth: 2,
        borderColor: colors.color_success,
        backgroundColor: colors.color_bg_success,
        pointBackgroundColor: colors.color_success
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
          stacked: false,
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
          beginAtZero: false
        }
      }]
    }
  }
});
}
