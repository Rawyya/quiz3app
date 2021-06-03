
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

declare var require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);

const Exporting = require('highcharts/modules/exporting');
Exporting(Highcharts);

const ExportData = require('highcharts/modules/export-data');
ExportData(Highcharts);

const Accessibility = require('highcharts/modules/accessibility');
Accessibility(Highcharts);



@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {
  public options: any = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: true,
        type: 'pie'
    },
    title: {
        text: 'Browser market shares'
    },
    tooltip: {
        pointFormat: '{series.name}: {point.percentage:.1f}%'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '{point.name}: {point.percentage:.1f} %'
            }
        }
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
            name: 'English quiz',
            y: 59.41,
            sliced: true,
            selected: true
        }, {
            name: 'Math test',
            y: 11.84
        }, {
            name: 'Orthographe et grammaire',
            y: 11.85
        }, {
            name: 'Scientific question',
            y: 4.67
        }, {
            name: 'Littérature',
            y: 5.18
        }, {
            name: 'Scientific question',
            y: 1.64
        }, {
            name: 'Calcul pratique',
            y: 1.6
        }, {
            name: 'Culture',
            y: 1.2
        }, {
            name: 'physic',
            y: 2.61
        }]
    }]
  }

  constructor() { }

  ngOnInit() {
    Highcharts.chart('container', this.options);
  }


}
