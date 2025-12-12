import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { AccountService } from 'src/app/services/account.service';

@Component({
  standalone: false,
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
  responseStatus: 'error' | 'success' | '' = '';

  async onLogin() {
    try {
      await this.accountService
        .login(this.loginEmail, this.loginPassword, this.loginRememberMe)
        .toPromise();

      this.responseStatus = 'success';
      this.responseText = 'Login successful';

      await sleep(500);

      this.router.navigate(['/home']);
    } catch (error: any) {
      console.log(error);

      this.responseStatus = 'error';

      if (typeof error.error === 'string') {
        this.responseText = error.error;
      } else {
        this.responseText = 'An unknown error occured.';
      }
    }
  }

  goToSignUp() {
    this.router.navigate(['/register']);
  }
}

function sleep(time: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
