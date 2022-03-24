import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  host: {
    class: 'fullWidth',
  },
})
export class DashboardComponent implements OnInit {
  constructor() {}
  public options = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
  };

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

  public doughnutChartLabels = ['A', 'B', 'C', 'D'];

  public doughnutChartData = [{ data: [28, 48, 40] }];

  ngOnInit(): void {}
}
