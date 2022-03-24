import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @Input() sidenavOpen!: boolean;
  @Output() toggleSidenav = new EventEmitter<void>();
  constructor() {}

  groups = [
    {
      name: 'Main',
      links: [
        { name: 'Dashboard', symbol: 'speed', path: 'dashboard' },
        { name: 'Add', symbol: 'add', path: 'add' },
      ],
    },

    {
      name: 'Views',
      links: [
        { name: 'Chart', symbol: 'query_stats', path: 'chart' },
        { name: 'Table', symbol: 'grid_on', path: 'table' },
        { name: 'Callendar', symbol: 'calendar_month', path: 'callender' },
        { name: 'Gallery', symbol: 'collections', path: 'gallery' },
      ],
    },

    {
      name: 'Extra',
      links: [{ name: 'About', symbol: 'info', path: 'about' }],
    },
  ];

  ngOnInit(): void {}

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }
}
