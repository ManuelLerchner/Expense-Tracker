import { Component, HostListener } from '@angular/core';
import { AccountService } from './services/account.service';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public accountService: AccountService) {}
}
