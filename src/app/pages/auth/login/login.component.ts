import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../shared.style.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const returnUrl =
      this.route.snapshot.queryParamMap.get('returnUrl') || '/home';

    this.accountService.keepSignedIn(returnUrl);
  }

  loginPassword: string = '';
  loginEmail: string = '';
  loginRememberMe: boolean = false;

  responseText: string = '';
  successful: boolean = false;

  onLogin() {
    this.accountService
      .login(this.loginEmail, this.loginPassword, this.loginRememberMe)
      .pipe(first())
      .subscribe({
        next: (data: User) => {
          this.successful = true;
          this.responseText = 'Login successful';
          this.router.navigate(['/home']);
        },
        error: (error: any) => {
          console.log(error);
          this.successful = false;

          if (typeof error.error === 'string') {
            this.responseText = error.error;
          } else {
            this.responseText = 'An unknown error occured.';
          }
        },
      });
  }

  goToSignUp() {
    this.router.navigate(['/register']);
  }
}
