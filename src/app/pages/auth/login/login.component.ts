import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../shared.style.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {}

  loginPassword: string = '';
  loginEmail: string = '';
  loginRememberMe: boolean = true;
  responseText: string = '';

  onLogin() {
    this.accountService
      .login(this.loginEmail, this.loginPassword, this.loginRememberMe)
      .pipe(first())
      .subscribe({
        next: (data: User) => {
          console.log('success');
          this.router.navigate(['/home']);
        },
        error: (error: any) => {
          console.log('error');
          this.responseText = 'Incorrect email or password.';
        },
      });
  }

  goToSignUp() {
    this.router.navigate(['/register']);
  }
}
