import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss'],
})
export class DoughnutChartComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  public options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: true,
      },
    },
  };

  public doughnutChartLabels = ['A', 'B', 'C', 'D'];

  public doughnutChartData = [{ data: [28, 48, 40] }];
}
