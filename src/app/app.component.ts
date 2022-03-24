import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Expense-Tracker';
  sidenavOpen = true;
  mobileView = false;

  prevWidth: number = Infinity;
  onToggleSidenav() {
    this.sidenavOpen = !this.sidenavOpen;
    console.log(this.sidenavOpen);
  }

  public innerWidth: any;
  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.prevWidth = this.innerWidth;
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
