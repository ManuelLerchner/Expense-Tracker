import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AccountService } from './../../services/account.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  standalone: false,
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss'],
})
export class UserDropdownComponent implements OnInit {
  constructor(public accountService: AccountService, private router: Router) {}

  ngOnInit(): void {}

  onLogout(): void {
    this.accountService.logout();
    this.router.navigate(['/login']);
  }
}
