import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/User';

import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss', '../shared.style.scss'],
})
export class AboutComponent implements OnInit {
  constructor(private accountService: AccountService) {}

  ngOnInit(): void {}

  loginPassword: string = '';
  loginEmail: string = '';

  registerPassword: string = '';
  registerEmail: string = '';
  registerUsername: string = '';

  onLogin() {
    this.accountService
      .login(this.loginEmail, this.loginPassword)
      .pipe(first())
      .subscribe({
        next: (data: User) => {
          // get return url from query parameters or default to home page
          console.log('success');
        },
        error: (error) => {
          console.log('error');
        },
      });
  }

  onRegister() {
    this.accountService
      .register(
        this.registerEmail,
        this.registerUsername,
        this.registerPassword
      )
      .pipe(first())
      .subscribe({
        next: () => {
          console.log('success register');
        },
        error: (error) => {
          console.log('error register');
        },
      });
  }
}
