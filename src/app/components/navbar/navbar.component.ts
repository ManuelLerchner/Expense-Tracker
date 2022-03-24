import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();
  @Input() mobileView!: boolean;

  constructor() {}

  ngOnInit(): void {}

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }
}
