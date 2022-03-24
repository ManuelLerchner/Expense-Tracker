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

  ngOnInit(): void {}
}
