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