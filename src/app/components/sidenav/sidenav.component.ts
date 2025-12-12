import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  standalone: false,
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
        { name: 'Modify', symbol: 'add', path: 'modify' },
      ],
    },

    {
      name: 'Views',
      links: [
        { name: 'Charts', symbol: 'query_stats', path: 'charts' },
        { name: 'Table', symbol: 'grid_on', path: 'table' },
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
