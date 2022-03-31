import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss'],
})
export class DoughnutChartComponent implements OnInit {
  @Input() public doughnutChartLabels!: string[];
  @Input() public doughnutChartData!: any[];
  @Input() public title!: string;

  constructor() {}

  ngOnInit(): void {}

  public options: any = {
    responsive: true,
    maintainAspectRatio: false,

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
}
