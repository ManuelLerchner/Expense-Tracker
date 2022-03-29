import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {}

  loginPassword: string = '';
  loginEmail: string = '';
  loginRememberMe: boolean = false;

  registerPassword: string = '';
  registerEmail: string = '';
  registerUsername: string = '';

  onLogin() {
    this.accountService
      .login(this.loginEmail, this.loginPassword, this.loginRememberMe)
      .pipe(first())
      .subscribe({
        next: (data: User) => {
          // get return url from query parameters or default to home page
          console.log('success');
          this.router.navigate(['/home']);
        },
        error: (error: any) => {
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
        error: (error: any) => {
          console.log('error register');
        },
      });
  }
}
