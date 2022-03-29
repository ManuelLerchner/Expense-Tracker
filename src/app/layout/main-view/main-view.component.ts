import { Component, HostListener, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
})
export class MainViewComponent implements OnInit {
  title = 'Expense-Tracker';
  sidenavOpen = true;
  mobileView = false;

  prevWidth: number = Infinity;
  onToggleSidenav() {
    this.sidenavOpen = !this.sidenavOpen;
  }

  constructor(public accountService: AccountService) {}

  public innerWidth: any;
  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.prevWidth = this.innerWidth;

    if (this.innerWidth < 768) {
      this.mobileView = true;
      this.sidenavOpen = false;
    }

    this.handleResizeEvent();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.prevWidth = this.innerWidth;
    this.innerWidth = window.innerWidth;
    this.handleResizeEvent();
  }

  handleResizeEvent() {
    if (this.innerWidth < 768 && this.prevWidth >= 768) {
      if (this.sidenavOpen) {
        this.sidenavOpen = false;
        this.mobileView = true;
      }
    } else if (this.innerWidth >= 768 && this.prevWidth < 768) {
      if (!this.sidenavOpen) {
        this.sidenavOpen = true;
        this.mobileView = false;
      }
    }
  }
}
