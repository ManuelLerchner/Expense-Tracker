import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  public options = {
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
        display: false,
      },
    },
  };

  lineChartColors: any = [
    {
      borderColor: 'red',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  public barChartLabels = [
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
  ];

  public barChartData = [
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
  ];
}
