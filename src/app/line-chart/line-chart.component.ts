
import { Component, OnInit } from '@angular/core';
import { Chart, HIGHCHARTS_MODULES} from 'angular-highcharts';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  chart: Chart;
  temp = [];
  table: any;
  data: any=[]

  constructor(private authService: AuthService) { }
  sortOrders = [];
  quiz: any;
  ngOnInit() {
   this.getQuiz()
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
  getQuiz() {
    this.authService.getResults().subscribe((data) => {
      console.log(data);
      if (data['success'] === true) {
        this.quiz = data['msg'];
  this.quiz.map(x=>{
    var percent =( x.score  / x.totalMarks)*100 ;
    this.data.push(percent?percent:0)
  })
  this.init()
        this.temp = [...this.quiz];
    
      } else {
        console.log('error');
      }
    })
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
        min:0,
        max:100,
        title: {
          text: "percentage"
        },
        gridLineWidth: 0,
        labels:{
          formatter: function () {
            console.log(this.value);
               return this.value ;
            }
        }

      },
      legend: {
        y: 25,
      },
      series: [{
        name: 'scores',
        data: this.data
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
