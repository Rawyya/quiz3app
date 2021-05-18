
import { Component, OnInit } from '@angular/core';
import { Chart, HIGHCHARTS_MODULES} from 'angular-highcharts';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  chart: Chart;

  ngOnInit() {
    this.init();
  }

  addPoint() {
    if (this.chart) {
      this.chart.addPoint(Math.floor(Math.random() * 10));
    } else {
      alert('init chart, first!');
    }
  }



  removePoint() {
    this.chart.removePoint(this.chart.ref.series[0].data.length - 1);
  }

  removeSerie() {
    this.chart.removeSeries(this.chart.ref.series.length - 1);
  }

  init() {
    let chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Linechart'
      },
      credits: {
        enabled: false
      },
      yAxis:{
        min:30,
        max:500,
        title: {
          text: "vinoth"
        },
        gridLineWidth: 0,
        labels:{
          formatter: function () {
            console.log(this.value);
               return this.value + ' km';
            }
        }

      },
      legend: {
        y: 25,
      },
      series: [{
        name: 'Line 1',
        data: [20,30,40,50]
      }]
    });
    // chart.addPoint(35);
    this.chart = chart;
    // chart.addPoint(15);
    // setTimeout(() => {
    //   chart.addPoint(6);
    // }, 2000);

    chart.ref$.subscribe(console.log);
  }

}
