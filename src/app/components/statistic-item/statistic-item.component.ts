import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistic-item',
  templateUrl: './statistic-item.component.html',
  styleUrls: ['./statistic-item.component.scss'],
})
export class StatisticItemComponent implements OnInit {
  @Input() title!: any;
  @Input() subtitle!: string;
  @Input() content!: any;
  @Input() icon!: string;

  constructor() {}

  ngOnInit(): void {}
}
