import { useEffect } from 'react';

const Highcharts = require('highcharts');

const LineChart = (props) => {
  const { container, data } = props;

  useEffect(() => {
    const getChart = () => {
      Highcharts.chart('container', {
        chart: {
          zoomType: 'x'
        },
        title: false,
        subtitle: {
          text: document.ontouchstart === undefined ?
            'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        xAxis: {
          type: 'datetime'
        },
        yAxis: {
          title: {
            text: 'Revenue'
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                [0, Highcharts.getOptions().colors[0]],
                [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
              ]
            },
            marker: {
              radius: 2
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1
              }
            },
            threshold: null
          }
        },

        series: [{
          type: 'area',
          name: 'Revenue',
          data: data
        }]
      });
    }
    getChart();
  }, [container, data]);

  return (
    <figure class="highcharts-figure">
      <div id="container"></div>
    </figure>
  )
};

export default LineChart;