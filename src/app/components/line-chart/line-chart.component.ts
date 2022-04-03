import { Component, Input, OnInit } from '@angular/core';

import 'chartjs-adapter-moment';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  @Input() lineChartLabels!: string[];
  @Input() lineChartData!: any[];
  @Input() title!: string;

  minData: any;
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

    scales: {
      y: {
        ticks: {
          callback: function (value: any, index: any, values: any) {
            return value + '€';
          },
        },

        suggestedMin: 0,
      },
      x: {
        type: 'time',
      },
    },

    //   zoom: {
    //     zoom: {
    //         wheel: {
    //             enabled: true,
    //         },
    //         pinch: {
    //             enabled: true,
    //         },
    //         overScaleMode: "y",
    //     },
    //     pan: {
    //         enabled: true,
    //         mode: "xy",
    //     },
    // },

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
      tooltip: {
        callbacks: {
          label: (tooltipItems: any) => {
            return (
              ' ' +
              Math.round(
                tooltipItems.dataset.data[tooltipItems.dataIndex] * 10
              ) /
                10 +
              '€'
            );
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
