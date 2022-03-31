import { Component, Input, OnInit } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  @Input() lineChartLabels!: string[];
  @Input() lineChartData!: any[];
  @Input() title!: string;

  constructor() {}

  ngOnInit(): void {}

  public options: any = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 5,
        hitRadius: 5,
        hoverRadius: 8,
        hoverBorderWidth: 2,
        pointBorderColor: 'lime',
        pointBackgroundColor: 'green',
        pointStyle: 'rectRounded',

        pointHoverBackgroundColor: 'green',
        pointHoverBorderColor: 'lime',
      },
      line: {
        tension: 0.3,
        backgroundColor: 'green',
        borderColor: 'rgb(50, 50, 50)',
      },
    },

    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          align: 'end',
          font: {
            size: 15,
          },
        },
      },
    },
  };

  lineChartColors: any = [
    {
      borderColor: 'red',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];
}
